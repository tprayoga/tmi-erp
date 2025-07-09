import Box from '@mui/material/Box';
import Card from '@mui/material/Card'; // STYLED COMPONENT

import { GradientBox, RootStyle } from './styles';
export default function SplashScreen() {
  return <RootStyle>
      <GradientBox>
        <Box p={4} zIndex={1} width={100} height={100} component={Card} borderRadius="50%" position="relative" boxSizing="border-box">
          <Box component="img" src="/static/logo/logo-svg.svg" alt="uko" width="100%" />
        </Box>
      </GradientBox>
    </RootStyle>;
}