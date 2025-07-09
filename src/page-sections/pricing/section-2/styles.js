import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles'; // STYLED COMPONENTS

export const StyledContainer = styled(Container)(() => ({
  zIndex: 2,
  marginTop: '-10rem',
  position: 'relative',
  paddingBottom: '3rem'
}));
export const StyledCard = styled(Card, {
  shouldForwardProp: prop => prop !== 'active'
})(({
  theme,
  active
}) => ({
  padding: '3rem',
  boxShadow: theme.shadows[2],
  border: `1px solid ${theme.palette.grey[100]}`,
  [theme.breakpoints.down(425)]: {
    padding: '2rem'
  },
  ...(active && {
    position: 'relative',
    border: `1px solid ${theme.palette.primary.main}`
  }),
  ...theme.applyStyles('dark', {
    border: `1px solid ${theme.palette.grey[700]}`
  }),
  '& .plan-title': {
    fontWeight: 600,
    textTransform: 'uppercase',
    color: theme.palette.text.secondary
  },
  '& .plan-price': {
    fontSize: 48,
    paddingTop: '1rem',
    paddingBottom: '2rem',
    '& span': {
      fontSize: 16,
      fontWeight: 500,
      color: theme.palette.text.secondary
    }
  }
}));
export const StyledChip = styled(Chip)({
  top: 20,
  right: 20,
  position: 'absolute'
});