import { useCallback, useMemo, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // Supabase client

export default function useProjects() {
  const [openModal, setOpenModal] = useState(false);
  const [filters, setFilters] = useState({
    status: "open",
    searchValue: "",
  });
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data dari Supabase
  useEffect(() => {
    const fetchInquiries = async () => {
      const { data, error } = await supabase.from("inquiries").select("*");

      if (error) {
        console.error("❌ Gagal ambil data inquiries:", error.message);
      } else {
        setInquiries(data);
        console.log("✅ inquiries:", data);
      }

      setLoading(false);
    };

    fetchInquiries();
  }, []);

  // Open modal
  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  // Close modal
  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  // Ubah filter
  const handleChangeFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Filter berdasarkan status dan pencarian
  const filteredProjects = useMemo(() => {
    const { status, searchValue } = filters;
    if (status === "all" && !searchValue) return inquiries;

    const searchValueLower = searchValue.toLowerCase();

    return inquiries.filter((project) => {
      const statusMatch = status === "all" || project.status === status;
      const searchMatch = !searchValue || (project.name && project.name.toLowerCase().includes(searchValueLower));
      return statusMatch && searchMatch;
    });
  }, [filters, inquiries]);

  return {
    inquiries, // raw data
    loading,
    filters,
    openModal,
    filteredProjects,
    handleOpenModal,
    handleCloseModal,
    handleChangeFilter,
  };
}
