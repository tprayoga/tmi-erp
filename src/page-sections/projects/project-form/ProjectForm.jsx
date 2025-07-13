import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; // MUI ICON COMPONENT

import Add from "@mui/icons-material/Add"; // MUI
import * as XLSX from "xlsx";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles"; // CUSTOM COMPONENTS
import { Select, MenuItem } from "@mui/material";
import Modal from "@/components/modal";
import Dropzone from "@/components/dropzone";
import { FormProvider, TextField, DatePicker } from "@/components/form"; // STYLED COMPONENT
import { useFieldArray } from "react-hook-form";
import Delete from "@mui/icons-material/Delete";
import { useState } from "react";

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
// fields = [{product_name, quantity, unit, specification, brand_preferred}]

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

      const sheetName = workbook.SheetNames[0]; // Ambil sheet pertama
      const worksheet = workbook.Sheets[sheetName];

      const json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
      setJsonData(json);
      console.log("Hasil JSON:", json);
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

        {jsonData.length > 0 && <pre style={{ background: "#f4f4f4", padding: "1rem", marginTop: "1rem" }}>{JSON.stringify(jsonData, null, 2)}</pre>}
      </div>
      <Button onClick={() => append({})}>+ Add Item</Button>
    </Stack>
  );
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required!"),
  description: Yup.string().required("Description is Required!"),
  deadline: Yup.date().required("Deadline is Required!"),
}); // ==============================================================

// ==============================================================
export default function ProjectForm({ open, handleClose }) {
  const initialValues = {
    name: "",
    image: "",
    members: [],
    description: "",
    deadline: new Date(),
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
            <InquiryItems name="items" /> {/* Komponen dinamis tambah produk */}
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
            <Button loading={isSubmitting} variant="contained" fullWidth>
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
