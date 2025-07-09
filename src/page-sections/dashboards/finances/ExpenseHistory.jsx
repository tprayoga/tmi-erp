import { nanoid } from 'nanoid';
import { format } from 'date-fns/format'; // MUI

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography'; // CUSTOM COMPONENTS

import Scrollbar from '@/components/scrollbar';
import MoreButton from '@/components/more-button';
import { FlexBox } from '@/components/flexbox'; // COMMON DASHBOARD RELATED COMPONENTS

import { BodyTableCell, HeadTableCell } from '../_common'; // CUSTOM UTILS METHOD

import { currency } from '@/utils/currency'; // CUSTOM DUMMY DATA SET

const EXPENSES_DATA = [{
  id: nanoid(),
  total: 356.25,
  createdAt: new Date('August 31, 2022 10:30:00'),
  user: {
    id: nanoid(),
    name: 'Arikunn',
    image: '/static/thumbnail/1.png'
  }
}, {
  id: nanoid(),
  total: 165.58,
  createdAt: new Date('August 30, 2022 13:30:00'),
  user: {
    id: nanoid(),
    name: 'Ikauwis',
    image: '/static/thumbnail/2.png'
  }
}, {
  id: nanoid(),
  total: 463.25,
  createdAt: new Date('August 29, 2022 19:30:00'),
  user: {
    id: nanoid(),
    name: 'Dayet',
    image: '/static/thumbnail/3.png'
  }
}];
export default function ExpenseHistory() {
  return <Card className="h-full">
      <Box p={3}>
        <Typography variant="h6">Expanse History</Typography>

        <Typography variant="body2" color="text.secondary">
          Top 7 Countries
        </Typography>
      </Box>

      <Scrollbar>
        <Table sx={{
        minWidth: 500
      }}>
          <TableHead>
            <TableRow>
              <HeadTableCell>NAME</HeadTableCell>
              <HeadTableCell>CREATED DATE</HeadTableCell>
              <HeadTableCell>AMOUNT</HeadTableCell>
              <HeadTableCell>ACTION</HeadTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {EXPENSES_DATA.map(item => <TableRow key={item.id}>
                <BodyTableCell>
                  <FlexBox gap={1}>
                    <Avatar variant="rounded" src={item.user.image} />

                    <div>
                      <Typography variant="body2" color="text.primary" fontWeight={500}>
                        {item.user.name}
                      </Typography>

                      <Typography variant="caption">{item.user.id.substring(0, 10)}</Typography>
                    </div>
                  </FlexBox>
                </BodyTableCell>

                <BodyTableCell>{format(new Date(item.createdAt), 'dd MMM, yyyy')}</BodyTableCell>

                <BodyTableCell>
                  <Typography variant="body2" color="text.primary" fontWeight={500}>
                    {currency(item.total)}
                  </Typography>
                </BodyTableCell>

                <BodyTableCell>
                  <MoreButton />
                </BodyTableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>;
}