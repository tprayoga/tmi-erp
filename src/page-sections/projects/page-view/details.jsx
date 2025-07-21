import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { supabase } from "@/lib/supabase"; // Supabase client

import { Button } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import { useState, useMemo, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import TableIms from "@/components/table/table-ims";
import { generateCustomQuotationPDF } from "./generateCustomQuotationPDF.jsx";
import { useParams } from "react-router";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const Div = styled("div")({
  padding: "1.5rem",
});

const Label = styled("p")({
  fontWeight: 600,
  marginBottom: 4,
  fontSize: 14,
});

export default function ProjectDetails({ href }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const { id } = useParams(); // ambil ID dari URL
  const [inquiry, setInquiry] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchInquiryById = async () => {
      const { data, error } = await supabase.from("inquiries").select("*").eq("id", id).single(); // agar hanya dapat satu objek

      if (error) {
        console.error("❌ Gagal ambil inquiry:", error.message);
      } else {
        setInquiry(data);
        console.log("✅ Inquiry detail:", data);
      }

      setLoading(false);
    };

    fetchInquiryById();
  }, [id]);
  useEffect(() => {
    const fetchInquiryItems = async () => {
      const { data: inquiry_items, error } = await supabase.from("inquiry_items").select("*").eq("inquiry_id", id);

      if (error) {
        console.error("❌ Gagal ambil inquiry_items:", error.message);
      } else {
        setItems(inquiry_items);
        console.log("✅ Items:", inquiry_items);
      }

      setLoading(false);
    };

    fetchInquiryItems();
  }, [id]);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber((prev) => Math.min(prev + 1, numPages));
  const userOptions = [
    { label: "John Doe", id: "1" },
    { label: "Jane Smith", id: "2" },
    { label: "Ahmad Yani", id: "3" },
  ];

  const data = {
    inquiry_code: "INQ-2025-001",
    date: "2025-07-08",
    customer_name: "PT Sumber Makmur",
    contact_person: "Budi",
    email: "budi@sumbermakmur.co.id",
    phone: "08123456789",
    subject: "Permintaan Penawaran CCTV",
    priority: "High",
    assigned_to: "andi",
    status: "Open",
    due_date: "2025-07-10",
    source: "WhatsApp",
    notes: "Pelanggan minta pengiriman cepat",
    reference_file: "cctv-requirement.pdf",
    items: [
      {
        product_name: "CCTV IP Camera",
        quantity: 10,
        unit: "pcs",
        specification: "Full HD, Infrared, PoE",
        brand_preferred: "Hikvision",
      },
      {
        product_name: "CCTV IP Camera",
        quantity: 10,
        unit: "pcs",
        specification: "Full HD, Infrared, PoE",
        brand_preferred: "Hikvision",
      },
    ],
    attachments: [
      // { type: "image", src: "/static/debit-card.png", alt: "Foto Gudang" },
      { type: "pdf", src: "/public/static/pdf.pdf", name: "Spec Sheet" },
    ],
  };
  const InfoRow = ({ label, value }) => (
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item xs={12} sm={4} md={3}>
        <Typography variant="body1" fontWeight={600} color="text.primary">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={9}>
        <Typography variant="body1" fontWeight={400}>
          {value || "-"}
        </Typography>
      </Grid>
    </Grid>
  );
  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "info";
      case "in_progress":
        return "warning";
      case "waiting_customer":
        return "primary";
      case "closed_won":
        return "success";
      case "closed_lost":
        return "error";
      case "cancelled":
      default:
        return "default";
    }
  };
  const quotationData = {
    customer: "PT. Sukses Selalu",
    date: "2025-07-14",
    items: [
      { description: "Laptop Asus ROG", qty: 2, price: 25000000 },
      { description: 'Monitor LG 27"', qty: 1, price: 5000000 },
    ],
  };

  return (
    <div container className="pt-2 pb-4">
      <Grid spacing={3}>
        <Grid xs={12} md={8}>
          <Card className="p-6">
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" m={2}>
              <Typography variant="body2" fontWeight={600}>
                INQ-2025-{inquiry?.id}
              </Typography>
              <Button variant="contained" color="primary" size="medium" onClick={() => generateCustomQuotationPDF()}>
                Generate Document
              </Button>
            </Box>

            {/* Body: Info kiri + Attachment kanan */}
            <Grid container spacing={4} px={4} py={2}>
              {/* LEFT: INQUIRY INFO */}
              <Grid item xs={12} md={8}>
                <Typography variant="body1" fontWeight={600} color="text.primary" gutterBottom>
                  Inquiry Information
                </Typography>
                <Typography variant="h4" fontWeight={400}>
                  {inquiry?.customer_name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ textTransform: "capitalize", mt: 1 }}>
                  {inquiry?.contact_person}
                </Typography>

                <Box mt={4}>
                  <Stack spacing={2}>
                    <InfoRow label="No Request" value={`INQ-2025-${inquiry?.id}`} />
                    <InfoRow label="Date" value={inquiry?.created_at} />
                    <InfoRow label="Due Date" value={inquiry?.due_date} />
                    <InfoRow label="Priority" value={inquiry?.priority} />
                    <InfoRow label="Status" value={<Chip label={inquiry?.status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} size="small" color={getStatusColor(inquiry?.status)} sx={{ fontWeight: 500 }} />} />
                    <InfoRow label="Company" value={inquiry?.customer_name} />
                    <InfoRow label="Contact Person" value={inquiry?.contact_person} />

                    {/* Assigned To - editable */}
                    <Box display="flex" alignItems="center" gap={2}>
                      <Box minWidth={150}>
                        <Typography variant="body1" fontWeight={600} color="text.primary">
                          Assigned To
                        </Typography>
                      </Box>
                      <Autocomplete
                        options={userOptions}
                        getOptionLabel={(option) => option.label}
                        value={userOptions.find((u) => u.id === inquiry?.assigned_to) || null}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            setData((prev) => ({ ...prev, assigned_to: newValue.id }));
                          }
                        }}
                        renderInput={(params) => <TextField {...params} label="Select User" size="small" fullWidth />}
                        sx={{ width: "100%", maxWidth: 300 }}
                      />
                    </Box>

                    <InfoRow label="Subject" value={inquiry?.subject} />
                    <InfoRow label="Description" value={inquiry?.notes} />
                    <InfoRow label="Source" value={inquiry?.source} />
                  </Stack>
                </Box>
              </Grid>

              {/* RIGHT: ATTACHMENTS */}
              <Grid item xs={12} md={4}>
                <Typography variant="body1" fontWeight={600} color="text.primary" gutterBottom>
                  Attachments
                </Typography>

                {!data.attachments?.length ? (
                  <Typography variant="body2" color="text.secondary">
                    (No attachments available)
                  </Typography>
                ) : (
                  <Stack spacing={2}>
                    {data.attachments.map((file, index) => (
                      <Box
                        key={index}
                        sx={{
                          border: "1px solid #e0e0e0",
                          borderRadius: 2,
                          p: 1,
                          boxShadow: 1,
                          bgcolor: "#fafafa",
                        }}
                      >
                        <Typography variant="body2" fontWeight={600} mb={1}>
                          {file.name || file.alt || `Attachment ${index + 1}`}
                        </Typography>

                        {file.type === "image" ? (
                          <img
                            src={file.src}
                            alt={file.alt || ""}
                            style={{
                              width: "100%",
                              maxHeight: 300,
                              objectFit: "contain",
                              borderRadius: 6,
                            }}
                          />
                        ) : file.type === "pdf" ? (
                          <>
                            <Document file={inquiry?.reference_file_url} onLoadSuccess={onDocumentLoadSuccess} loading="Loading PDF...">
                              {/* Jangan loop Page, render hanya 1 halaman */}
                              <Page key={`page_${pageNumber}`} pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} customTextRenderer={false} />
                            </Document>

                            {/* Kontrol Navigasi */}
                            <div style={{ marginTop: "1rem" }}>
                              <Button onClick={goToPrevPage} disabled={pageNumber <= 1}>
                                Previous
                              </Button>
                              <span style={{ margin: "0 1rem" }}>
                                Page {pageNumber} of {numPages}
                              </span>
                              <Button onClick={goToNextPage} disabled={pageNumber >= numPages}>
                                Next
                              </Button>
                            </div>
                          </>
                        ) : (
                          <Typography variant="caption" color="text.secondary">
                            Unsupported file type
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Stack>
                )}
              </Grid>
            </Grid>
            {/* <Divider /> */}
          </Card>
          <Card sx={{ mt: 1 }}>
            {/* <Div>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Inquiry Detail - {data.inquiry_code}
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={12} sm={6}>
                  <Label>Customer Name</Label>
                  <Typography>{data.customer_name}</Typography>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Label>Contact Person</Label>
                  <Typography>{data.contact_person}</Typography>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Label>Email</Label>
                  <Typography>{data.email}</Typography>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Label>Phone</Label>
                  <Typography>{data.phone}</Typography>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Label>Subject</Label>
                  <Typography>{data.subject}</Typography>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Label>Due Date</Label>
                  <Typography>{data.due_date}</Typography>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Label>Priority</Label>
                  <Chip label={data.priority} color="error" size="small" />
                </Grid>
                <Grid xs={12} sm={6}>
                  <Label>Source</Label>
                  <Typography>{data.source}</Typography>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Label>Status</Label>
                  <Chip label={data.status} color="primary" size="small" />
                </Grid>
                <Grid xs={12} sm={6}>
                  <Label>Assigned To</Label>
                  <Typography>{data.assigned_to}</Typography>
                </Grid>
                <Grid xs={12}>
                  <Label>Notes</Label>
                  <Typography>{data.notes}</Typography>
                </Grid>
              </Grid>
            </Div> */}
            <Divider />

            <Div>
              <Typography variant="subtitle1" fontWeight={600} mb={2}>
                Item Requested
              </Typography>

              {items?.map((item, i) => (
                <Box key={i} mb={3} p={2} border={1} borderColor="grey.300" borderRadius={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography fontWeight={600}>
                        {i + 1}. {item?.product_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        {item?.quantity} {item?.unit} • {item?.specification} • Preferred: {item?.brand_preferred}
                      </Typography>
                    </Box>

                    <Box width={200}>
                      <TextField
                        label="Harga (Rp)"
                        type="number"
                        size="small"
                        fullWidth
                        value={item.price || ""}
                        onChange={(e) => {
                          const newPrice = e.target.value;
                          setData((prevData) => {
                            const newItems = [...prevData.items];
                            newItems[i] = { ...newItems[i], price: newPrice };
                            return { ...prevData, items: newItems };
                          });
                        }}
                      />
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Div>

            {/* 
            <Divider /> */}

            {/* <Div>
              <Typography variant="subtitle1" fontWeight={600} mb={2}>
                Reference File
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <InsertDriveFileIcon color="action" />
                <Typography variant="body2">{data.reference_file}</Typography>
              </Stack>
            </Div> */}
          </Card>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end" gap={2} mt={2} pb={4}>
        <Button variant="outlined" color="primary" size="medium">
          Refuse
        </Button>
        <Button variant="contained" color="primary" size="medium">
          Create Quotation
        </Button>
      </Box>
    </div>
  );
}
