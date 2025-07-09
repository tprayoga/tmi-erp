import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography'; // MUI ICON COMPONENT

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'; // CUSTOM COMPONENTS

import Link from '@/components/link';
import Scrollbar from '@/components/scrollbar'; // COMMON STYLED COMPONENTS

import { BodyTableCell, BodyTableRow, HeadTableCell } from '../styles'; // CUSTOM DATA

import { NOTIFICATION_SETTINGS } from './data';
export default function Notifications() {
  return <Card>
      <div className="p-3">
        <Typography variant="body1" fontWeight={500}>
          Notifications
        </Typography>

        <Typography variant="body2" color="text.secondary">
          We need permission from your browser to show notifications.{' '}
          <Link href="#">Request permission</Link>
        </Typography>
      </div>

      <Scrollbar autoHide={false}>
        <Table sx={{
        minWidth: 600
      }}>
          <TableHead>
            <TableRow>
              <HeadTableCell>Type</HeadTableCell>
              <HeadTableCell>Email</HeadTableCell>
              <HeadTableCell>Browser</HeadTableCell>
              <HeadTableCell>App</HeadTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {NOTIFICATION_SETTINGS.map(item => <BodyTableRow key={item.id}>
                <BodyTableCell>{item.type}</BodyTableCell>

                <BodyTableCell>
                  <Checkbox defaultChecked={item.email} />
                </BodyTableCell>

                <BodyTableCell>
                  <Checkbox defaultChecked={item.browser} />
                </BodyTableCell>

                <BodyTableCell>
                  <Checkbox defaultChecked={item.app} />
                </BodyTableCell>
              </BodyTableRow>)}
          </TableBody>
        </Table>
      </Scrollbar>

      <div className="p-3">
        <Box mb={6} mt={2}>
          <TextField select fullWidth value="always" variant="outlined" placeholder="Language" label="When should we send you notifications?" slotProps={{
          select: {
            native: true,
            IconComponent: KeyboardArrowDown
          }
        }} sx={{
          maxWidth: 400
        }}>
            <option value="always">Always</option>
          </TextField>

          <Typography variant="body2" color="text.secondary" mt={2}>
            In order to cut back on noise, email notifications are grouped together and only sent
            when you're idle or offline.
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button variant="contained">Save Changes</Button>
          <Button variant="outlined">Cancel</Button>
        </Stack>
      </div>
    </Card>;
}