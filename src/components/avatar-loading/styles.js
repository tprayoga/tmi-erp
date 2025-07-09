import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles'; // ==============================================================

// ==============================================================
export const StyledAvatar = styled(Avatar, {
  shouldForwardProp: prop => prop !== 'deg' && prop !== 'borderSize'
})(({
  theme,
  borderSize,
  deg
}) => ({
  padding: '3px',
  backgroundOrigin: 'border-box',
  border: `double ${borderSize}px transparent`,
  backgroundClip: 'padding-box, border-box',
  backgroundImage: `linear-gradient(white, white), conic-gradient(from 0deg, ${theme.palette.primary.main} ${deg}deg, ${theme.palette.grey[200]} 0deg)`,
  ...theme.applyStyles('dark', {
    backgroundImage: `linear-gradient(${theme.palette.grey[800]}, ${theme.palette.grey[800]}), conic-gradient(from 0deg, ${theme.palette.primary.main} ${deg}deg, ${theme.palette.grey[800]} 0deg)`
  })
}));