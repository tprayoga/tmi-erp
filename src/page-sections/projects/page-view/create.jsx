import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography, MenuItem, CircularProgress } from "@mui/material";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router";

const CreateProjectPageView = () => {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const navigate = useNavigate();

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      customer_name: "",
      contact_person: "",
      email: "",
      phone: "",
      subject: "",
      due_date: "",
      priority: "",
      source: "",
      notes: "",
      assigned_to: "",
      reference_file_name: "",
      reference_file_url: "",
      status: "open",
      items: [
        {
          product_name: "",
          quantity: "",
          unit: "",
          specification: "",
          brand_preferred: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const [selectedPICId, setSelectedPICId] = useState(null);
  const [customerList, setCustomerList] = useState([]);
  const [customerPics, setCustomerPics] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

  const selectedCustomerName = useWatch({ control, name: "customer_name" });
  const selectedContact = useWatch({ control, name: "contact_person" });

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data } = await supabase.from("customers").select("*");
      setCustomerList(data || []);
    };

    const fetchCustomerPics = async () => {
      const { data } = await supabase.from("customer_pics").select("*, customers(nama_pt)");
      setCustomerPics(data || []);
    };

    fetchCustomers();
    fetchCustomerPics();
  }, []);

  useEffect(() => {
    if (selectedCustomerName) {
      const contacts = customerPics.filter((pic) => pic.customers?.nama_pt === selectedCustomerName).map((pic) => ({ label: pic.nama, value: pic.nama, id: pic.id }));
      setFilteredContacts(contacts);
      setValue("contact_person", "");
    }
  }, [selectedCustomerName, customerPics, setValue]);

  useEffect(() => {
    if (selectedCustomerName && selectedContact) {
      const pic = customerPics.find((p) => p.customers?.nama_pt === selectedCustomerName && p.nama === selectedContact);
      setSelectedPICId(pic?.id ?? null);
    }
  }, [selectedCustomerName, selectedContact, customerPics]);

  const onSubmit = async (formValues) => {
    try {
      const { data: inquiry, error: inquiryError } = await supabase
        .from("inquiries")
        .insert([
          {
            customer_name: formValues.customer_name,
            contact_person: formValues.contact_person,
            email: formValues.email,
            phone: formValues.phone,
            subject: formValues.subject,
            due_date: formValues.due_date,
            priority: formValues.priority,
            source: formValues.source,
            notes: formValues.notes,
            reference_file_name: formValues.reference_file_name,
            reference_file_url: formValues.reference_file_url,
            assigned_to: formValues.assigned_to,
            status: "open",
            customer_id: selectedPICId, // fix FK
          },
        ])
        .select()
        .single();

      if (inquiryError) throw inquiryError;

      const items = formValues.items.map((item) => ({
        inquiry_id: inquiry.id,
        product_name: item.product_name,
        quantity: item.quantity,
        unit: item.unit,
        specification: item.specification,
        brand_preferred: item.brand_preferred,
      }));

      const { error: itemError } = await supabase.from("inquiry_items").insert(items);

      if (itemError) throw itemError;

      alert("Inquiry berhasil disimpan!");
      navigate("/dashboard/projects/version-1");
    } catch (err) {
      console.error("Gagal simpan:", err.message);
      alert("Gagal menyimpan inquiry. Coba lagi.");
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const filePath = `${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage.from("tmi").upload(filePath, file);

    if (error) {
      console.error("Upload error:", error.message);
      alert("Gagal upload file");
      setUploading(false);
      return;
    }

    const { data: publicData } = supabase.storage.from("tmi").getPublicUrl(filePath);

    setFileUrl(publicData.publicUrl);
    setFileName(file.name);
    setValue("reference_file_name", file.name);
    setValue("reference_file_url", publicData.publicUrl);
    setUploading(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      const newItems = json.map((item) => ({
        product_name: item.product_name || "",
        quantity: item.quantity || "",
        unit: item.unit || "",
        specification: item.specification || "",
        brand_preferred: item.brand_preferred || "",
      }));

      newItems.forEach((item) => append(item));
    };
    reader.readAsArrayBuffer(file);
  };

  const selectOptions = {
    customer_name: customerList.map((c) => ({ label: c.nama_pt, value: c.nama_pt })),
    contact_person: filteredContacts,
    priority: ["Low", "Medium", "High"].map((v) => ({ label: v, value: v })),
    source: ["WhatsApp", "Email", "Call", "Web"].map((v) => ({ label: v, value: v })),
    assigned_to: ["User A", "User B"].map((v) => ({ label: v, value: v })),
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 24 }}>
      <Typography variant="h5" gutterBottom>
        Form Inquiry
      </Typography>
      <Grid container spacing={2}>
        {["customer_name", "contact_person", "email", "phone", "subject", "due_date", "priority", "source", "assigned_to", "notes"].map((name) => (
          <Grid item xs={12} sm={6} key={name}>
            <Controller
              name={name}
              control={control}
              render={({ field }) => {
                if (selectOptions[name]) {
                  return (
                    <TextField select fullWidth label={name.replace(/_/g, " ")} {...field} InputLabelProps={{ shrink: true }}>
                      {selectOptions[name].map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  );
                } else if (name === "due_date") {
                  return <TextField fullWidth type="date" label="Due Date" {...field} InputLabelProps={{ shrink: true }} />;
                } else {
                  return <TextField fullWidth label={name.replace(/_/g, " ")} {...field} InputLabelProps={{ shrink: true }} />;
                }
              }}
            />
          </Grid>
        ))}

        <Grid item xs={12}>
          <Button variant="outlined" component="label" disabled={uploading}>
            {uploading ? <CircularProgress size={20} /> : "Upload Reference File"}
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {fileName && <Typography variant="body2">Uploaded: {fileName}</Typography>}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Items</Typography>
        </Grid>

        {fields.map((item, index) => (
          <Grid container spacing={2} key={item.id}>
            {["product_name", "quantity", "unit", "specification", "brand_preferred"].map((fieldKey) => (
              <Grid item xs={12} sm={6} key={fieldKey}>
                <Controller name={`items[${index}].${fieldKey}`} control={control} render={({ field }) => <TextField fullWidth label={fieldKey.replace(/_/g, " ")} {...field} />} />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button variant="outlined" color="error" onClick={() => remove(index)}>
                Hapus Item
              </Button>
            </Grid>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Button variant="contained" onClick={() => append({})} sx={{ mr: 2 }}>
            Tambah Item Manual
          </Button>
          <Button variant="outlined" component="label">
            Upload Excel Item
            <input type="file" accept=".xlsx" hidden onChange={handleFileUpload} />
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button variant="outlined" color="inherit" onClick={() => window.history.back()}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                Simpan Inquiry
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateProjectPageView;
