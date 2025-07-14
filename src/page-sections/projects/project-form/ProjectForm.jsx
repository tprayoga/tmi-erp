import * as Yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as XLSX from "xlsx";
import { useState } from "react";

// MUI
import { Stack, Button, Typography, IconButton, Avatar, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";

// Custom components
import Modal from "@/components/modal";
import Dropzone from "@/components/dropzone";
import { FormProvider, TextField, DatePicker } from "@/components/form";

const StyledStack = styled(Stack)(({ theme }) => ({
  "& .add-btn": {
    border: `1px solid ${theme.palette.divider}`,
  },
  "& .label": {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 8,
    display: "block",
  },
  "& .btn-group": {
    gap: "1rem",
    display: "flex",
    paddingTop: "1.5rem",
  },
}));

const validationSchema = Yup.object().shape({
  customer_name: Yup.string().required("Customer Name is required"),
  contact_person: Yup.string().required("Contact Person is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  subject: Yup.string().required("Subject is required"),
  due_date: Yup.date().required("Due date is required"),
  priority: Yup.string().required("Priority is required"),
  source: Yup.string().required("Source is required"),
  notes: Yup.string(),
  reference_file: Yup.mixed(),
  assigned_to: Yup.string().required("Assigned to is required"),
  items: Yup.array()
    .of(
      Yup.object().shape({
        product_name: Yup.string().required("Product name is required"),
        quantity: Yup.number().typeError("Quantity must be a number").required("Quantity is required"),
        unit: Yup.string().required("Unit is required"),
        specification: Yup.string(),
        brand_preferred: Yup.string(),
      })
    )
    .min(1, "At least one item is required"),
});

const InquiryItems = () => {
  const { fields, append, remove } = useFieldArray({ name: "items" });
  const [jsonData, setJsonData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      setJsonData(json);
      json.forEach((item) => {
        append({
          product_name: item.product_name || "",
          quantity: item.quantity || "",
          unit: item.unit || "",
          specification: item.specification || "",
          brand_preferred: item.brand_preferred || "",
        });
      });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Stack spacing={1}>
      {fields.map((item, index) => (
        <Stack key={item.id} spacing={1} direction="row">
          <TextField name={`items.${index}.product_name`} size="small" placeholder="Product Name" />
          <TextField name={`items.${index}.quantity`} size="small" type="number" placeholder="Qty" />
          <TextField name={`items.${index}.unit`} size="small" placeholder="Unit" />
          <TextField name={`items.${index}.specification`} size="small" placeholder="Specification" />
          <TextField name={`items.${index}.brand_preferred`} size="small" placeholder="Preferred Brand" />
          <IconButton onClick={() => remove(index)}>
            <Delete />
          </IconButton>
        </Stack>
      ))}

      <div>
        <Typography variant="h6" gutterBottom>
          Import Excel dan Konversi ke JSON
        </Typography>
        <Button variant="contained" component="label">
          Upload Excel File
          <input type="file" hidden accept=".xlsx, .xls" onChange={handleFileUpload} />
        </Button>
        {jsonData.length > 0 && <pre style={{ background: "#f4f4f4", padding: "1rem", marginTop: "1rem", maxHeight: 300, overflow: "auto" }}>{JSON.stringify(jsonData, null, 2)}</pre>}
      </div>

      <Button
        onClick={() =>
          append({
            product_name: "",
            quantity: "",
            unit: "",
            specification: "",
            brand_preferred: "",
          })
        }
      >
        + Add Item
      </Button>
    </Stack>
  );
};

export default function ProjectForm({ open, handleClose }) {
  const initialValues = {
    customer_name: "",
    contact_person: "",
    email: "",
    phone: "",
    subject: "",
    due_date: new Date(),
    priority: "",
    source: "",
    notes: "",
    reference_file: null,
    assigned_to: "",
    items: [],
  };

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleSubmitForm = handleSubmit((values) => {
    alert(JSON.stringify(values, null, 2));
  });

  return (
    <Modal open={open} handleClose={handleClose}>
      <FormProvider methods={methods} onSubmit={handleSubmitForm}>
        <StyledStack spacing={2}>
          {/* Customer Info */}
          <div>
            <p className="label">Customer Name</p>
            <TextField fullWidth size="small" name="customer_name" placeholder="PT Sumber Makmur" />
          </div>

          <div>
            <p className="label">Contact Person</p>
            <TextField fullWidth size="small" name="contact_person" placeholder="Nama PIC / Kontak Customer" />
          </div>

          <div>
            <p className="label">Email</p>
            <TextField fullWidth size="small" name="email" placeholder="example@domain.com" />
          </div>

          <div>
            <p className="label">Phone</p>
            <TextField fullWidth size="small" name="phone" placeholder="08xxxx" />
          </div>

          {/* Inquiry Details */}
          <div>
            <p className="label">Subject</p>
            <TextField fullWidth size="small" name="subject" placeholder="Contoh: Permintaan Penawaran CCTV" />
          </div>

          <div>
            <p className="label">Due Date</p>
            <DatePicker name="due_date" label="" />
          </div>

          <div>
            <p className="label">Priority</p>
            <Select fullWidth size="small" name="priority">
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </div>

          <div>
            <p className="label">Source</p>
            <Select fullWidth size="small" name="source">
              <MenuItem value="WhatsApp">WhatsApp</MenuItem>
              <MenuItem value="Email">Email</MenuItem>
              <MenuItem value="Call">Call</MenuItem>
              <MenuItem value="Web">Web</MenuItem>
            </Select>
          </div>

          <div>
            <p className="label">Notes</p>
            <TextField rows={2} fullWidth multiline size="small" name="notes" placeholder="Catatan tambahan dari customer" />
          </div>

          {/* Reference File */}
          <div>
            <p className="label">Reference File</p>
            <Dropzone name="reference_file" />
          </div>

          {/* Inquiry Items */}
          <div>
            <p className="label">Items</p>
            <InquiryItems />
          </div>

          {/* Team Assign (Optional) */}
          <div>
            <p className="label">Assigned To</p>
            <Select fullWidth size="small" name="assigned_to">
              <MenuItem value="andi">Andi</MenuItem>
              <MenuItem value="budi">Budi</MenuItem>
              <MenuItem value="citra">Citra</MenuItem>
            </Select>
          </div>

          {/* Buttons */}
          <div className="btn-group">
            <Button type="submit" variant="contained" fullWidth>
              Save Inquiry
            </Button>
            <Button variant="outlined" fullWidth onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </StyledStack>
      </FormProvider>
    </Modal>
  );
}
