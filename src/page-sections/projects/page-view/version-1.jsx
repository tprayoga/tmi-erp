import Grid from "@mui/material/Grid2"; // CUSTOM COMPONENTS

import StatusFilter from "../StatusFilter";
import SearchFilter from "../SearchFilter";
import ProjectForm from "../project-form";
import ProjectCard1 from "../project-card-1";

import useProjects from "../useProjects";
import { supabase } from "@/lib/supabase"; // SUPABASE CLIENT
import { useState, useEffect } from "react"; // REACT HOOKS
export default function ProjectVersionOnePageView() {
  const { filters, openModal, filteredProjects, handleChangeFilter, handleCloseModal, handleOpenModal } = useProjects();

  console.log(filteredProjects); // ✅ Aman digunakan di browser
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Failed to get user:", error.message);
      } else {
        setUser(data.user);
        console.log("✅ user:", data.user);
      }
    };

    fetchUser();
  }, []);
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const filePath = `${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("tmi") // Ganti dengan nama bucket kamu
      .upload(filePath, file);

    if (error) {
      console.error("Upload error:", error.message);
      alert("Gagal upload file");
      setUploading(false);
      return;
    }

    // Ambil public URL
    const { data: publicData } = supabase.storage.from("tmi").getPublicUrl(filePath);

    setFileUrl(publicData.publicUrl);
    setFileName(file.name);
    setUploading(false);
  };
  const formValues = {
    customer_name: "PT Sumber Makmur",
    contact_person: "Budi",
    email: "budi@example.com",
    phone: "08123456789",
    subject: "Permintaan Penawaran CCTV",
    due_date: new Date(),
    priority: "High",
    source: "WhatsApp",
    notes: "Urgent",
    reference_file_name: "lampiran.pdf",
    reference_file_url: "https://...",
    assigned_to: "budi",
    items: [
      {
        product_name: "Kamera 1080p",
        quantity: 2,
        unit: "pcs",
        specification: "Outdoor",
        brand_preferred: "Hikvision",
      },
    ],
  };
  const handleSubmit = async (formValues) => {
    try {
      // 1. Insert ke table inquiries
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
          },
        ])
        .select()
        .single();

      if (inquiryError) throw inquiryError;

      // 2. Insert items dengan foreign key inquiry_id
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
    } catch (err) {
      console.error("Gagal simpan:", err.message);
      alert("Gagal menyimpan inquiry. Coba lagi.");
    }
  };
  return (
    <div className="pt-2 pb-4">
      {/* PROJECT FILTER BY STATUS */}
      <StatusFilter value={filters.status} handleChange={(value) => handleChangeFilter("status", value)} />

      {/* SEARCH INPUT AND CREATE BUTTON */}
      <SearchFilter handleOpenModal={handleOpenModal} handleChange={(value) => handleChangeFilter("searchValue", value)} />

      {/* PROJECT CREATION MODAL */}
      <ProjectForm open={openModal} handleClose={handleCloseModal} />

      {/* PROJECT CARDS */}
      <Grid container spacing={3}>
        {filteredProjects.map((project) => (
          <Grid key={project.id} xs={12} sm={6} lg={4}>
            <ProjectCard1 project={project} />
          </Grid>
        ))}
      </Grid>

      <div style={{ padding: "1rem" }}>
        <h3>Upload ke Supabase Storage</h3>
        <input type="file" onChange={handleUpload} disabled={uploading} />
        {uploading && <p>Uploading...</p>}
        {fileUrl && (
          <div style={{ marginTop: "1rem" }}>
            <p>
              <strong>{fileName}</strong> berhasil diupload.
            </p>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              🔗 Lihat file
            </a>
          </div>
        )}
      </div>

      <button onClick={() => handleSubmit(formValues)}>Submit Form</button>
    </div>
  );
}
