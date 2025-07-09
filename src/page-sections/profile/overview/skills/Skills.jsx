import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup'; // CUSTOM COMPONENTS

import FlexBetween from '@/components/flexbox/FlexBetween';
import MoreButton from '@/components/more-button'; // STYLED COMPONENTS

import { ButtonOne, ButtonTwo } from './styles'; // CUSTOM DUMMY DATA LIST

const SKILLS = [{
  id: 1,
  title: 'Graphic Design',
  amount: 40
}, {
  id: 2,
  title: 'Font End Dev',
  amount: 32
}, {
  id: 3,
  title: 'Figma Design',
  amount: 50
}, {
  id: 4,
  title: 'Figma Design',
  amount: 50,
  complete: true
}, {
  id: 5,
  title: 'Graphic Design',
  amount: 40
}, {
  id: 6,
  title: 'Font End Dev',
  amount: 32
}];
export default function Skills() {
  return <Card className="p-3">
      <FlexBetween mb={3}>
        <Typography variant="body1" fontWeight={500}>
          Skills
        </Typography>

        <MoreButton size="small" />
      </FlexBetween>

      <Grid container spacing={2}>
        {SKILLS.map(skill => <Grid size={{
        xl: 3,
        lg: 4,
        sm: 6,
        xs: 12
      }} key={skill.id}>
            <ButtonGroup fullWidth>
              <ButtonOne disableRipple>{skill.title}</ButtonOne>
              <ButtonTwo disableRipple>{skill.amount}</ButtonTwo>
            </ButtonGroup>
          </Grid>)}
      </Grid>
    </Card>;
}