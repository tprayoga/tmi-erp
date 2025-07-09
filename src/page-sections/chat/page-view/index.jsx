import { useCallback, useState } from 'react'; // MUI

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Add from '@mui/icons-material/Add'; // CUSTOM COMPONENTS

import PinChats from '../PinChats';
import AllMessages from '../AllMessages';
import Conversation from '../conversation';
import SearchInput from '@/components/search-input';
import FlexBetween from '@/components/flexbox/FlexBetween'; // STYLED COMPONENTS

const StyledSearchInput = styled(SearchInput)(({
  theme
}) => ({
  backgroundColor: theme.palette.action.selected,
  border: `1px solid ${theme.palette.grey[200]}`,
  ...theme.applyStyles('dark', {
    border: `1px solid ${theme.palette.grey[600]}`
  })
}));
const StyledIconButton = styled(IconButton)(({
  theme
}) => ({
  backgroundColor: theme.palette.action.selected,
  border: `1px solid ${theme.palette.divider}`
}));
const StyledCard = styled(Card)({
  height: '100%',
  paddingBottom: 8
});
export default function ChatPageView() {
  const [openLeftDrawer, setOpenLeftDrawer] = useState(false);
  const downMd = useMediaQuery(theme => theme.breakpoints.down('md'));
  const handleOpen = useCallback(() => {
    setOpenLeftDrawer(true);
  }, []); // RECENT CONVERSATION LIST

  const MESSAGE_CONTENT = <StyledCard>
      <div className="p-3">
        <FlexBetween mb={3}>
          <Typography variant="body1" fontWeight={500} fontSize={18}>
            Messages
          </Typography>

          <StyledIconButton size="small">
            <Add />
          </StyledIconButton>
        </FlexBetween>

        <StyledSearchInput placeholder="Search..." />
      </div>

      {
      /* PINNED ITEMS */
    }
      <PinChats />

      <Divider />

      {
      /* ALL MESSAGES */
    }
      <AllMessages />
    </StyledCard>;
  return <div className="pt-2 pb-4">
      <Grid container spacing={3}>
        {downMd ? <Drawer anchor="left" open={openLeftDrawer} onClose={() => setOpenLeftDrawer(false)}>
            <Box width={300} padding={1}>
              {MESSAGE_CONTENT}
            </Box>
          </Drawer> : <Grid size={{
        md: 4,
        xs: 12
      }}>{MESSAGE_CONTENT}</Grid>}

        <Grid size={{
        md: 8,
        xs: 12
      }}>
          <Conversation handleOpen={handleOpen} />
        </Grid>
      </Grid>
    </div>;
}