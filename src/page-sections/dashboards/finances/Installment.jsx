import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress'; // CUSTOM COMPONENTS

import RouterLink from '@/components/link';
import FlexBetween from '@/components/flexbox/FlexBetween';
export default function Installment() {
  return <Card className="p-3">
      <FlexBetween mb={2.5}>
        <Typography variant="body2" fontSize={18} fontWeight={500}>
          Installment
        </Typography>

        <Link component={RouterLink} href="/" color="grey.400" fontWeight={400}>
          View all
        </Link>
      </FlexBetween>

      <Typography variant="body2" color="grey.500" mb={1}>
        Electricity Installments
      </Typography>

      <LinearProgress value={60} variant="determinate" sx={{
      height: 8
    }} />

      <FlexBetween mt={1}>
        <Typography variant="body2">Collected</Typography>

        <Typography variant="body2" sx={{
        span: {
          color: 'text.secondary'
        }
      }}>
          <span>$200.00</span> / $300.00
        </Typography>
      </FlexBetween>
    </Card>;
}