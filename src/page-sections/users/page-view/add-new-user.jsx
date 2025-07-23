import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; // MUI
import { useState, useEffect } from "react"; // MUI
import Card from "@mui/material/Card";

import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles"; // MUI ICON COMPONENT
import { supabase } from "@/lib/supabase"; // Supabase client
import { Container, Box, Typography, TextField, Button, MenuItem, Paper, Divider } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera"; // CUSTOM COMPONENTS

import { FormProvider } from "@/components/form"; // STYLED COMPONENTS

const SwitchWrapper = styled("div")({
  width: "100%",
  marginTop: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
const StyledCard = styled(Card)(({ theme }) => ({
  padding: 24,
  minHeight: 400,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  ".alert-text": {
    maxWidth: 200,
    display: "block",
    marginTop: "1rem",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
const ButtonWrapper = styled("div")(({ theme }) => ({
  width: 100,
  height: 100,
  display: "flex",
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.grey[100],
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.grey[700],
  }),
}));
const UploadButton = styled("div")(({ theme }) => ({
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.grey[200],
  border: `1px solid ${theme.palette.background.paper}`,
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.grey[600],
  }),
  "& .icon": {
    fontSize: 26,
    color: theme.palette.grey[400],
  },
  "& input": {
    display: "none",
  },
}));
// const validationSchema = Yup.object().shape({
//   fullName: Yup.string().required("Name is Required!"),
//   email: Yup.string().email().required("Email is Required!"),
//   phone: Yup.string().min(8).required("Phone is Required!"),
//   country: Yup.string().required("Country is Required!"),
//   state: Yup.string().required("State is Required!"),
//   city: Yup.string().required("City is Required!"),
//   address: Yup.string().required("Address is Required!"),
//   zip: Yup.string().required("Zip is Required!"),
//   about: Yup.string().required("About is Required!"),
// });
export default function AddNewUserPageView() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedCustomerName, setSelectedCustomerName] = useState("");

  const { register: registerCustomer, handleSubmit: handleSubmitCustomer, reset: resetCustomer } = useForm();

  const { register: registerPIC, handleSubmit: handleSubmitPIC, reset: resetPIC } = useForm();

  const fetchCustomers = async () => {
    const { data, error } = await supabase.from("customers").select("*");
    if (!error) setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const onSubmitCustomer = async (values) => {
    const { error } = await supabase.from("customers").insert([
      {
        nama_pt: values.nama_pt,
        alamat: values.alamat,
      },
    ]);

    if (error) {
      alert("❌ Gagal menambahkan perusahaan");
    } else {
      alert("✅ Perusahaan berhasil ditambahkan");
      resetCustomer();
      fetchCustomers(); // refresh list PT
    }
  };

  const handleCustomerChange = (e) => {
    const id = e.target.value;
    setSelectedCustomerId(id);
    const customer = customers.find((c) => c.id === id);
    setSelectedCustomerName(customer?.nama_pt || "");
  };

  const onSubmitPIC = async (values) => {
    const { error } = await supabase.from("customer_pics").insert([
      {
        customer_id: selectedCustomerId,
        nama: values.nama,
        email: values.email,
        telepon: values.telepon,
      },
    ]);

    if (error) {
      alert("❌ Gagal menambahkan PIC");
    } else {
      alert(`✅ PIC berhasil ditambahkan ke ${selectedCustomerName}`);
      resetPIC();
    }
  };

  // const initialValues = {
  //   fullName: "",
  //   email: "",
  //   phone: "",
  //   country: "",
  //   state: "",
  //   city: "",
  //   address: "",
  //   zip: "",
  //   about: "",
  // };
  // const methods = useForm({
  //   defaultValues: initialValues,
  //   resolver: yupResolver(validationSchema),
  // });
  // const {
  //   handleSubmit,
  //   formState: { isSubmitting },
  // } = methods;
  // const handleSubmitForm = handleSubmit((values) => {
  //   alert(JSON.stringify(values, null, 2));
  // });
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Tambah Perusahaan
        </Typography>

        <Box component="form" onSubmit={handleSubmitCustomer(onSubmitCustomer)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Nama Perusahaan (PT)" {...registerCustomer("nama_pt")} required />
          <TextField label="Alamat" {...registerCustomer("alamat")} />
          <Button variant="contained" color="primary" type="submit">
            Simpan Perusahaan
          </Button>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" fontWeight={600} gutterBottom>
          Tambah PIC ke Perusahaan yang Sudah Ada
        </Typography>

        <TextField select label="Pilih Perusahaan" value={selectedCustomerId} onChange={handleCustomerChange} fullWidth margin="normal" required>
          {customers.map((cust) => (
            <MenuItem key={cust.id} value={cust.id}>
              {cust.nama_pt}
            </MenuItem>
          ))}
        </TextField>

        {selectedCustomerId && (
          <Box component="form" onSubmit={handleSubmitPIC(onSubmitPIC)} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField label="Nama PIC" {...registerPIC("nama")} required />
            <TextField label="Email" {...registerPIC("email")} />
            <TextField label="Telepon" {...registerPIC("telepon")} />
            <Button variant="contained" color="success" type="submit">
              Tambah PIC ke {selectedCustomerName}
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
