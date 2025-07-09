import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress'; // CUSTOM COMPONENTS

import Title from '@/components/title';
import FlexBetween from '@/components/flexbox/FlexBetween'; // CUSTOM UTILS METHOD

import { formatK } from '@/utils/currency';
export default function YearlyRevenue() {
  return <Card sx={{
    padding: 3,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& .content': {
      mt: 7
    }
  }}>
      <div>
        <Title title={5103} titlePrefix="$" percentage="-1.25%" percentageType="error" subtitle="Yearly Revenue" />
      </div>

      <div className="content">
        <FlexBetween mb={1}>
          <Typography variant="body2" fontWeight={500}>
            {formatK(60000)} to Target
          </Typography>

          <Typography fontWeight={500} variant="body2" color="text.secondary">
            65%
          </Typography>
        </FlexBetween>

        <LinearProgress value={79} variant="determinate" sx={{
        height: 8
      }} />
      </div>
    </Card>;
}