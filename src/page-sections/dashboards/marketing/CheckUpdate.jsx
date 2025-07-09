import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
export default function CheckUpdate() {
  return <Card sx={{
    p: 4,
    textAlign: 'center'
  }}>
      <Box mb={1} width="100%" maxWidth={200} component="img" src="/static/illustration/check-update.svg" />

      <Typography variant="body2" sx={{
      pt: 2,
      pb: 3,
      fontSize: 20,
      margin: 'auto',
      fontWeight: 600,
      maxWidth: {
        xl: '60%'
      }
    }}>
        We have big update for you!
      </Typography>

      <Button>Check Update</Button>
    </Card>;
}