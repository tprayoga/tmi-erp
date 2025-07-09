import Typography from '@mui/material/Typography';
// CUSTOM COMPONENTS
import FlexBox from '@/components/flexbox/FlexBox';
import IconWrapper from '@/components/icon-wrapper'; // ==============================================================

// ==============================================================
export default function Item({
  Icon,
  title,
  description
}) {
  return <FlexBox gap={1} alignItems="center">
      <IconWrapper>
        <Icon color="primary" />
      </IconWrapper>

      <div>
        <Typography variant="body2" fontWeight={500}>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </div>
    </FlexBox>;
}