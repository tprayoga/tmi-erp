import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles'; //  STYLED COMPONENTS

const Wrapper = styled('div')(({
  theme
}) => ({
  gap: '1rem',
  display: 'flex',
  alignItems: 'center',
  paddingInline: '1rem',
  paddingBottom: '1.5rem',
  '.select': {
    flex: '1 1 200px'
  },
  [theme.breakpoints.down(426)]: {
    flexWrap: 'wrap'
  }
})); // ==============================================================

// ==============================================================
const INVOICE_STATUS = [{
  id: 1,
  name: 'All',
  value: ''
}, {
  id: 2,
  name: 'Pending',
  value: 'pending'
}, {
  id: 3,
  name: 'Complete',
  value: 'complete'
}];
export default function InvoiceTableActions({
  handleChangeFilter,
  filter
}) {
  return <Wrapper>
      <TextField select fullWidth label="Status" className="select" value={filter.status} onChange={e => handleChangeFilter('status', e.target.value)}>
        {INVOICE_STATUS.map(({
        id,
        name,
        value
      }) => <MenuItem key={id} value={value}>
            {name}
          </MenuItem>)}
      </TextField>

      <TextField fullWidth value={filter.search} label="Search invoice by name..." onChange={e => handleChangeFilter('search', e.target.value)} />
    </Wrapper>;
}