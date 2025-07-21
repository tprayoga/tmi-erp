import React, { useState } from "react";
import { TextField, Button, Grid, Typography, MenuItem, CircularProgress } from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { supabase } from "@/lib/supabase"; // SUPABASE CLIENT
import * as XLSX from "xlsx";
import { useNavigate } from "react-router";
import { status } from "nprogress";
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

  const onSubmit = async (formValues) => {
    try {
      // 1. Simpan ke tabel inquiries
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
          },
        ])
        .select()
        .single();

      if (inquiryError) throw inquiryError;

      // 2. Simpan items
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

    const { data, error } = await supabase.storage.from("tmi").upload(filePath, file);

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 24 }}>
      <Typography variant="h5" gutterBottom>
        Form Inquiry
      </Typography>
      <Grid container spacing={2}>
        {[
          { name: "customer_name", label: "Customer Name" },
          { name: "contact_person", label: "Contact Person" },
          { name: "email", label: "Email" },
          { name: "phone", label: "Phone" },
          { name: "subject", label: "Subject" },
          { name: "due_date", label: "Due Date", type: "date" },
          { name: "priority", label: "Priority" },
          { name: "source", label: "Source" },
          { name: "assigned_to", label: "Assigned To" },
          { name: "notes", label: "Notes", multiline: true },
        ].map(({ name, label, ...props }) => (
          <Grid item xs={12} sm={6} key={name}>
            <Controller name={name} control={control} render={({ field }) => <TextField InputLabelProps={{ shrink: true }} fullWidth label={label} {...field} {...props} />} />
          </Grid>
        ))}

        {/* Upload File */}
        <Grid item xs={12}>
          <Button variant="outlined" component="label" disabled={uploading}>
            {uploading ? <CircularProgress size={20} /> : "Upload Reference File"}
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {fileName && <Typography variant="body2">Uploaded: {fileName}</Typography>}
        </Grid>

        {/* Items */}
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

        {/* Submit */}
        <Grid item xs={12}>
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  // bisa arahkan ke halaman lain jika perlu
                  window.history.back(); // atau navigate(-1) jika pakai react-router
                }}
              >
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
