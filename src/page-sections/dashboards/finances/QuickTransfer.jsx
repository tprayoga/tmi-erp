import { Fragment, useState } from 'react'; // MUI

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles'; // MUI ICON COMPONENT

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'; // CUSTOM COMPONENTS

import FlexBox from '@/components/flexbox/FlexBox';
export default function QuickTransfer() {
  const theme = useTheme();
  const [selectCard, setSelectCard] = useState('Visa');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = value => () => {
    if (value) setSelectCard(value);
    setAnchorEl(null);
  };

  const END_ADORNMENT = <Fragment>
      <Stack direction="row" alignItems="center" onClick={handleClick} sx={{
      pl: 1.5,
      cursor: 'pointer',
      borderLeft: `2px solid ${theme.palette.divider}`
    }}>
        <span>{selectCard}</span> <KeyboardArrowDown />
      </Stack>

      <Menu id="fade-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose(null)} slots={{
      transition: Fade
    }}>
        <MenuItem onClick={handleClose('Visa')}>Visa</MenuItem>
        <MenuItem onClick={handleClose('Master')}>Master</MenuItem>
        <MenuItem onClick={handleClose('Credit')}>Credit</MenuItem>
      </Menu>
    </Fragment>;
  return <Card className="p-3">
      <Typography variant="body2" fontSize={18} fontWeight={500}>
        Quick Transfer
      </Typography>

      <Box my={3}>
        <TextField fullWidth placeholder="4436  2548  2654  236" slotProps={{
        input: {
          endAdornment: END_ADORNMENT
        }
      }} />
      </Box>

      <FlexBox gap={2} alignItems="center">
        <Button>Send Money</Button>

        <Button variant="outlined" color="secondary">
          Save Draft
        </Button>
      </FlexBox>
    </Card>;
}