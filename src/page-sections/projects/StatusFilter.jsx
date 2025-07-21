import { useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { supabase } from "@/lib/supabase";

// Template status (tanpa amount)
const PIPELINE_STATUS_TEMPLATE = [
  { value: "open", title: "Open" },
  { value: "in_progress", title: "In Progress" },
  { value: "waiting_customer", title: "Waiting Customer" },
  { value: "closed_won", title: "Closed - Won" },
  { value: "closed_lost", title: "Closed - Lost" },
  { value: "cancelled", title: "Cancelled" },
];

// Styled components
const StyledRoot = styled(Card)(({ theme }) => ({
  paddingTop: "1.5rem",
  paddingInline: "2rem",
  "& .MuiTabs-root": {
    borderBottom: "none",
  },
}));

const Title = styled(Typography)({
  marginBottom: "1rem",
  lineHeight: 1,
});

// ==========================
// Component
// ==========================
export default function StatusFilter({ value, handleChange }) {
  const [pipelineStatus, setPipelineStatus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      const { data, error } = await supabase.from("inquiries").select("*");

      if (error) {
        console.error("❌ Gagal ambil data inquiries:", error.message);
      } else {
        // Hitung jumlah inquiries berdasarkan status
        const statusCountMap = data.reduce((acc, item) => {
          acc[item.status] = (acc[item.status] || 0) + 1;
          return acc;
        }, {});

        const computed = PIPELINE_STATUS_TEMPLATE.map((status) => ({
          ...status,
          amount: statusCountMap[status.value] || 0,
        }));

        setPipelineStatus(computed);
      }

      setLoading(false);
    };

    fetchInquiries();
  }, []);

  if (loading) return null;

  return (
    <StyledRoot>
      <Title variant="h6" fontSize={20}>
        Projects
      </Title>

      <TabContext value={value}>
        <TabList variant="scrollable" onChange={(_, val) => handleChange(val)}>
          {pipelineStatus.map(({ value, title, amount }) => (
            <Tab
              disableRipple
              key={value}
              value={value}
              label={
                <Typography variant="body2">
                  {title} ({amount})
                </Typography>
              }
            />
          ))}
        </TabList>
      </TabContext>
    </StyledRoot>
  );
}
