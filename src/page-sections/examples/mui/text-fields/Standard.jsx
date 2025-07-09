import { useState } from 'react'; // MUI

import Masonry from '@mui/lab/Masonry';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment'; // MUI ICON COMPONENTS

import Password from '@mui/icons-material/Password';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'; // CUSTOM COMPONENT

import Block from '@/components/block';
const currencies = [{
  value: 'USD',
  label: '$'
}, {
  value: 'EUR',
  label: '€'
}, {
  value: 'BTC',
  label: '฿'
}, {
  value: 'JPY',
  label: '¥'
}];
export default function Standard() {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handlePasswordVisibleToggle = () => setVisiblePassword(state => !state);

  return <Masonry columns={{
    md: 2,
    xs: 1
  }} spacing={3}>
      <Block title="Basic">
        <Stack spacing={3}>
          <TextField variant="standard" label="Name" size="medium" />
          <TextField variant="standard" label="Name" size="medium" defaultValue="Nabed Khan" />
          <TextField size="medium" type="password" label="Password" variant="standard" defaultValue="123456" />
          <TextField variant="standard" type="email" label="Email" size="medium" disabled />
        </Stack>
      </Block>

      <Block title="With Adornment">
        <Stack spacing={3}>
          <TextField size="medium" variant="standard" label="With Normal TextField" id="outlined-start-adornment" slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">kg</InputAdornment>
          }
        }} />

          <TextField size="medium" label="Password" variant="standard" type={visiblePassword ? 'text' : 'password'} slotProps={{
          input: {
            endAdornment: <IconButton onClick={handlePasswordVisibleToggle} sx={{
              p: 0
            }}>
                    {visiblePassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
          }
        }} />

          <TextField size="medium" label="Password" variant="standard" defaultValue="123456" type={visiblePassword ? 'text' : 'password'} slotProps={{
          input: {
            endAdornment: <IconButton onClick={handlePasswordVisibleToggle} sx={{
              p: 0
            }}>
                    {visiblePassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>,
            startAdornment: <InputAdornment position="start">
                    <Password />
                  </InputAdornment>
          }
        }} />
        </Stack>
      </Block>

      <Block title="Select">
        <Stack spacing={3}>
          <TextField select variant="standard" size="medium" label="Select" defaultValue="EUR">
            {currencies.map(option => <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>)}
          </TextField>

          <TextField select size="medium" variant="standard" defaultValue="EUR" label="Native select" slotProps={{
          select: {
            native: true
          }
        }}>
            {currencies.map(option => <option key={option.value} value={option.value}>
                {option.label}
              </option>)}
          </TextField>
        </Stack>
      </Block>

      <Block title="With Helper Text">
        <Stack spacing={3}>
          <TextField size="medium" variant="standard" label="Helper text" id="outlined-helperText" defaultValue="Nabed Khan" helperText="Some important text" />

          <TextField error label="Error" size="medium" variant="standard" defaultValue="Hello World" helperText="Incorrect entry." id="outlined-error-helper-text" />
        </Stack>
      </Block>

      <Block title="Size">
        <Stack spacing={3}>
          <TextField variant="standard" label="Size" defaultValue="Small" />
          <TextField variant="standard" label="Size" defaultValue="Medium" size="medium" />
        </Stack>
      </Block>
    </Masonry>;
}