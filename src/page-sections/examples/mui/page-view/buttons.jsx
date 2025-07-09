import { useCallback, useState } from 'react'; // MUI

import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext'; // MUI ICON COMPONENTS

import Start from '@mui/icons-material/Start';
import Folder from '@mui/icons-material/Folder'; // CUSTOM COMPONENTS

import ComponentPageLayout from '../../ComponentPageLayout';
import Block from '@/components/block';
import FabSizes from '../Fab/FabSizes';
import DefaultFab from '../Fab/DefaultFab';
import ExtendedFab from '../Fab/ExtendedFab';
import TextButton from '../button/TextButton';
import ButtonSizes from '../button/ButtonSizes';
import WithIconButton from '../button/WithIconButton';
import OutlinedButton from '../button/OutlinedButton';
import ContainedButton from '../button/ContainedButton';
import TextButtonGroup from '../button-group/TextButtonGroup';
import ButtonGroupSizes from '../button-group/ButtonGroupSizes';
import OutlinedButtonGroup from '../button-group/OutlinedButtonGroup';
import ContainedButtonGroup from '../button-group/ContainedButtonGroup';
export default function MuiButtonsPageView() {
  const [value, setValue] = useState('1');
  const handleChange = useCallback((_, newValue) => setValue(newValue), []);
  return <ComponentPageLayout title="Buttons" fullLink="https://mui.com/material-ui/react-button">
      <TabContext value={value}>
        <TabList onChange={handleChange}>
          <Tab value="1" label="Buttons" />
          <Tab value="2" label="Loading Button" />
          <Tab value="3" label="Floating Action Button" />
          <Tab value="4" label="Group Buttons" />
        </TabList>

        {
        /* BUTTONS */
      }
        <TabPanel value="1">
          <Stack mt={5} spacing={4}>
            <Block title="Contained Button">
              <ContainedButton />
            </Block>

            <Block title="Outlined Button">
              <OutlinedButton />
            </Block>

            <Block title="Text Button">
              <TextButton />
            </Block>

            <Block title="With Icon">
              <WithIconButton />
            </Block>

            <Block title="Icon Button">
              <Stack direction="row" flexWrap="wrap" gap={3}>
                <IconButton>
                  <Folder />
                </IconButton>

                <IconButton color="primary">
                  <Folder />
                </IconButton>

                <IconButton color="secondary">
                  <Folder />
                </IconButton>

                <IconButton color="success">
                  <Folder />
                </IconButton>

                <IconButton color="warning">
                  <Folder />
                </IconButton>

                <IconButton color="error">
                  <Folder />
                </IconButton>

                <IconButton color="info">
                  <Folder />
                </IconButton>
              </Stack>
            </Block>

            <Block title="Sizes">
              <ButtonSizes />
            </Block>
          </Stack>
        </TabPanel>

        {
        /* LOADING BUTTONS */
      }
        <TabPanel value="2">
          <Stack mt={5} spacing={4}>
            <Block title="Contained">
              <Stack direction="row" gap={3}>
                <Button loading variant="contained">
                  Submit
                </Button>

                <Button loading loadingIndicator="Loading…" variant="contained">
                  Fetch data
                </Button>

                <Button loading loadingPosition="start" startIcon={<Start />}>
                  Start
                </Button>

                <Button loading loadingPosition="end" endIcon={<Start />}>
                  End
                </Button>
              </Stack>
            </Block>

            <Block title="Outlined">
              <Stack direction="row" gap={3}>
                <Button loading variant="outlined">
                  Submit
                </Button>

                <Button loading loadingIndicator="Loading…" variant="outlined">
                  Fetch data
                </Button>

                <Button loading variant="outlined" loadingPosition="start" startIcon={<Start />}>
                  Start
                </Button>

                <Button loading variant="outlined" loadingPosition="end" endIcon={<Start />}>
                  End
                </Button>
              </Stack>
            </Block>

            <Block title="Text">
              <Stack direction="row" gap={3}>
                <Button loading variant="text">
                  Submit
                </Button>

                <Button loading loadingIndicator="Loading…" variant="text">
                  Fetch data
                </Button>

                <Button loading variant="text" loadingPosition="start" startIcon={<Start />}>
                  Start
                </Button>

                <Button loading variant="text" loadingPosition="end" endIcon={<Start />}>
                  End
                </Button>
              </Stack>
            </Block>
          </Stack>
        </TabPanel>

        {
        /* FAB - FLOATING ACTION BUTTON */
      }
        <TabPanel value="3">
          <Stack mt={5} spacing={4}>
            <Block title="Default">
              <DefaultFab />
            </Block>

            <Block title="Extended">
              <ExtendedFab />
            </Block>

            <Block title="Sizes">
              <FabSizes />
            </Block>
          </Stack>
        </TabPanel>

        {
        /* GROUP BUTTONS */
      }
        <TabPanel value="4">
          <Stack mt={5} spacing={4}>
            <Block title="Contained">
              <ContainedButtonGroup />
            </Block>

            <Block title="Outlined">
              <OutlinedButtonGroup />
            </Block>

            <Block title="Text">
              <TextButtonGroup />
            </Block>

            <Block title="Sizes">
              <ButtonGroupSizes />
            </Block>
          </Stack>
        </TabPanel>
      </TabContext>
    </ComponentPageLayout>;
}