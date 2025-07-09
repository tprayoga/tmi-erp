import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const Div = styled('div')({
  padding: '1.5rem'
});

const Label = styled('p')({
  fontWeight: 600,
  marginBottom: 4,
  fontSize: 14
});

export default function ProjectDetails() {
  const data = {
    inquiry_code: 'INQ-2025-001',
    date: '2025-07-08',
    customer_name: 'PT Sumber Makmur',
    contact_person: 'Budi',
    email: 'budi@sumbermakmur.co.id',
    phone: '08123456789',
    subject: 'Permintaan Penawaran CCTV',
    priority: 'High',
    assigned_to: 'andi',
    status: 'Open',
    due_date: '2025-07-10',
    source: 'WhatsApp',
    notes: 'Pelanggan minta pengiriman cepat',
    reference_file: 'cctv-requirement.pdf',
    items: [
      {
        product_name: 'CCTV IP Camera',
        quantity: 10,
        unit: 'pcs',
        specification: 'Full HD, Infrared, PoE',
        brand_preferred: 'Hikvision'
      },
      {
        product_name: 'CCTV IP Camera',
        quantity: 10,
        unit: 'pcs',
        specification: 'Full HD, Infrared, PoE',
        brand_preferred: 'Hikvision'
      },
    ]
  };

  return (
    <div className="pt-2 pb-4">
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card>
            <Div>
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
            </Div>
            <Divider />

            <Div>
              <Typography variant="subtitle1" fontWeight={600} mb={2}>
                Item Requested
              </Typography>
              {data.items.map((item, i) => (
                <Box key={i} mb={2}>
                  <Typography fontWeight={500}>{item.product_name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.quantity} {item.unit} • {item.specification} • Preferred: {item.brand_preferred}
                  </Typography>
                </Box>
              ))}
            </Div>

            <Divider />

            <Div>
              <Typography variant="subtitle1" fontWeight={600} mb={2}>
                Reference File
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <InsertDriveFileIcon color="action" />
                <Typography variant="body2">{data.reference_file}</Typography>
              </Stack>
            </Div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
