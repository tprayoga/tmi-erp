import { useState } from 'react'; // MUI

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Zoom from '@mui/material/Zoom';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography'; // CUSTOM COMPONENTS

import Block from '@/components/block';
import FlexBox from '@/components/flexbox/FlexBox';
import ComponentPageLayout from '../../ComponentPageLayout';
export default function MuiPopoverPageView() {
  const [basicEl, setBasicEl] = useState(null);

  const handleBasicClose = () => setBasicEl(null);

  const handleBasicClick = event => {
    setBasicEl(event.currentTarget);
  };

  const [hoverEl, setHoverEl] = useState(null);

  const handleHoverClose = () => setHoverEl(null);

  const handleHover = e => setHoverEl(e.currentTarget);

  const [transitionEl, setTransitionEl] = useState(null);
  const [trans, setTrans] = useState('z');

  const handleTransClose = () => setTransitionEl(null);

  const handleTransClick = val => event => {
    setTransitionEl(event.currentTarget);
    setTrans(val);
  };

  return <ComponentPageLayout title="Popover">
      <Grid container spacing={3}>
        <Grid size={{
        lg: 6,
        xs: 12
      }}>
          <Block title="Basic">
            <Stack justifyContent="center" alignItems="center">
              <Button variant="contained" onClick={handleBasicClick}>
                Open Popover
              </Button>

              <Popover anchorEl={basicEl} open={Boolean(basicEl)} onClose={handleBasicClose} anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}>
                <Box p={3} maxWidth={400}>
                  <Typography variant="body1" fontWeight={600}>
                    The content of the Popover.
                  </Typography>

                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam odio fugit
                    suscipit iste est beatae vero quia hic explicabo mollitia?
                  </Typography>
                </Box>
              </Popover>
            </Stack>
          </Block>
        </Grid>

        <Grid size={{
        lg: 6,
        xs: 12
      }}>
          <Block title="Mouse over interaction">
            <Stack justifyContent="center" alignItems="center">
              <Typography variant="body2" color="primary.main" fontWeight={600} onMouseEnter={handleHover} onMouseLeave={handleHoverClose}>
                Hover with a Popover
              </Typography>

              <Popover disableRestoreFocus anchorEl={hoverEl} open={Boolean(hoverEl)} onClose={handleHoverClose} anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }} transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }} sx={{
              pointerEvents: 'none'
            }}>
                <Box p={3} maxWidth={400}>
                  <Typography variant="body1" fontWeight={600}>
                    The content of the Popover.
                  </Typography>

                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam odio fugit
                    suscipit iste est beatae vero quia hic explicabo mollitia?
                  </Typography>
                </Box>
              </Popover>
            </Stack>
          </Block>
        </Grid>

        <Grid size={{
        lg: 6,
        xs: 12
      }}>
          <Block title="Transition">
            <Stack justifyContent="center" alignItems="center">
              <FlexBox gap={3}>
                <Button variant="contained" onClick={handleTransClick('z')}>
                  Zoom
                </Button>

                <Button variant="contained" onClick={handleTransClick('f')}>
                  Fade
                </Button>
              </FlexBox>

              <Popover anchorEl={transitionEl} open={Boolean(transitionEl)} onClose={handleTransClose} anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }} TransitionComponent={trans === 'z' ? Zoom : trans === 'f' ? Fade : Grow}>
                <Box p={3} maxWidth={400}>
                  <Typography variant="body1" fontWeight={600}>
                    The content of the Popover.
                  </Typography>

                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam odio fugit
                    suscipit iste est beatae vero quia hic explicabo mollitia?
                  </Typography>
                </Box>
              </Popover>
            </Stack>
          </Block>
        </Grid>
      </Grid>
    </ComponentPageLayout>;
}