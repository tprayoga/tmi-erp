// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import MoreHoriz from "@mui/icons-material/MoreHoriz"; // MUI

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress"; // CUSTOM COMPONENTS
import { Chip } from "@mui/material";
import { Stack } from "@mui/material";
import Link from "@/components/link";
import MoreButton from "@/components/more-button";
import FlexBetween from "@/components/flexbox/FlexBetween"; // STYLED COMPONENTS

import { StyledAvatarGroup, StyledRoot } from "./styles"; // CUSTOM DATA TYPES

const DATE_FORMAT_OPTIONS = {
  day: "numeric",
  month: "short",
  year: "2-digit",
};
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
const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case "high":
      return "error"; // merah
    case "medium":
      return "warning"; // oranye
    case "low":
      return "success"; // hijau
    case "critical":
      return "secondary"; // ungu
    default:
      return "default"; // abu-abu
  }
};

const DESCRIPTION_STYLES = {
  my: 3,
  fontWeight: 500,
  lineHeight: 1.5,
  color: "text.secondary",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
}; // ==============================================================

// ==============================================================
export default function ProjectCard1({ project }) {
  return (
    <StyledRoot>
      <FlexBetween gap={2} alignItems="flex-start">
        <Stack spacing={0.5} className="truncate">
          {/* Project Name */}
          <Link href={`/dashboard/projects/details/${project.id}`}>
            <Typography noWrap variant="body1" fontWeight={600} color="text.primary">
              {project.subject}
            </Typography>
          </Link>

          {/* Due Date */}
          <Typography variant="body2" fontWeight={500} color="text.secondary">
            Due on {new Date(project.due_date).toLocaleDateString("en-US", DATE_FORMAT_OPTIONS)}
          </Typography>

          {/* Status */}
          <Chip label={project.status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} size="small" color={getStatusColor(project.status)} sx={{ width: "fit-content", mt: 0.5 }} />

          {/* Priority */}
          <Chip label={`Priority: ${project.priority}`} size="small" color={getPriorityColor(project.priority)} sx={{ width: "fit-content", mt: 0.5 }} />

          {/* Company Name */}
          <Typography variant="body2" fontWeight={500} color="text.secondary">
            Company: <span style={{ fontWeight: 400 }}>{project.customer_name}</span>
          </Typography>

          {/* Customer Name */}
          <Typography variant="body2" fontWeight={500} color="text.secondary">
            Customer: <span style={{ fontWeight: 400 }}>{project.contact_person}</span>
          </Typography>
        </Stack>

        <MoreButton size="small" Icon={MoreHoriz} sx={{ mt: 0.5 }} />
      </FlexBetween>

      {/* Project Description */}
      <Typography variant="body2" sx={{ ...DESCRIPTION_STYLES, mt: 2 }}>
        {project.notes}
      </Typography>

      {/* Assigned To */}
      <FlexBetween pb={1} mt={2}>
        <Typography variant="body2" fontWeight={500}>
          Assigned to
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          {project.assigned_to}
        </Typography>
      </FlexBetween>

      {/* Members & Add Button */}
      {/* <FlexBetween pt={3}>
    <StyledAvatarGroup max={4}>
      {project.members.map((member, index) => (
        <Avatar key={index} alt={member} src={member} />
      ))}
    </StyledAvatarGroup>

    <IconButton className="add-btn" sx={{ bgcolor: 'grey.100' }}>
      <Add fontSize="small" />
    </IconButton>
  </FlexBetween> */}
    </StyledRoot>
  );
}
