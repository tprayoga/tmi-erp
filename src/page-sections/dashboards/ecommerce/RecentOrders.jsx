import { nanoid } from 'nanoid';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'; // MUI

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography'; // CUSTOM COMPONENTS

import Scrollbar from '@/components/scrollbar';
import FlexBox from '@/components/flexbox/FlexBox';
import StatusBadge from '@/components/status-badge'; // COMMON DASHBOARD RELATED COMPONENTS

import { BodyTableCell, HeadTableCell } from '../_common'; // CUSTOM DUMMY DATA SET

const RECENT_ORDERS = [{
  id: nanoid(),
  total: 678.5,
  status: 'Pending',
  status_type: 'warning',
  createdAt: Date.now() - 7 * 60 * 1000,
  payment: {
    type: 'PayPal',
    image: '/static/payment/paypal.svg'
  }
}, {
  id: nanoid(),
  total: 165.58,
  status: 'Shipped',
  status_type: 'success',
  createdAt: Date.now() - 8 * 60 * 1000,
  payment: {
    type: 'Card',
    image: '/static/payment/master-card.svg'
  }
}, {
  id: nanoid(),
  total: 463.25,
  status: 'Confirmed',
  status_type: 'primary',
  createdAt: Date.now() - 9 * 60 * 1000,
  payment: {
    type: 'Skrill',
    image: '/static/payment/skrill.svg'
  }
}, {
  id: nanoid(),
  total: 363.25,
  status: 'Rejected',
  status_type: 'error',
  createdAt: Date.now() - 10 * 60 * 1000,
  payment: {
    type: 'Visa Card',
    image: '/static/payment/visa-2.svg'
  }
}];
export default function RecentOrders() {
  return <Card className="h-full">
      <Typography variant="h6" sx={{
      p: 3
    }}>
        Recent Orders
      </Typography>

      <Scrollbar>
        <Table sx={{
        minWidth: 500
      }}>
          <TableHead>
            <TableRow>
              <HeadTableCell>METHOD</HeadTableCell>
              <HeadTableCell>CREATED</HeadTableCell>
              <HeadTableCell>TOTAL</HeadTableCell>
              <HeadTableCell align="center">STATUS</HeadTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {RECENT_ORDERS.map((item, index) => <TableRow key={index}>
                <BodyTableCell>
                  <FlexBox gap={2}>
                    <FlexBox alignItems="center" minWidth={35}>
                      <img src={item.payment.image} alt={item.payment.type} />
                    </FlexBox>

                    <div>
                      <Typography variant="body2" color="text.primary" fontWeight={500}>
                        #{item.id.substring(0, 5)}
                      </Typography>

                      <Typography variant="caption">Paid by {item.payment.type}</Typography>
                    </div>
                  </FlexBox>
                </BodyTableCell>

                <BodyTableCell>
                  {formatDistanceToNow(new Date(item.createdAt), {
                addSuffix: true
              })}
                </BodyTableCell>

                <BodyTableCell>${item.total}</BodyTableCell>

                <BodyTableCell align="center">
                  <StatusBadge type={item.status_type}>{item.status}</StatusBadge>
                </BodyTableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>;
}