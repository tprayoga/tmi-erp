import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles'; // MUI ICON COMPONENTS

import People from '@mui/icons-material/People';
import Twitter from '@mui/icons-material/Twitter';
import Instagram from '@mui/icons-material/Instagram';
import SportsBasketball from '@mui/icons-material/SportsBasketball';
import FacebookOutlined from '@mui/icons-material/FacebookOutlined';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline'; // CUSTOM COMPONENTS

import { FlexBox, FlexBetween } from '@/components/flexbox'; // STYLED COMPONENTS

const MainWrapper = styled(Card)(({
  theme
}) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  '&::after': {
    top: 0,
    height: 125,
    content: '""',
    width: '100%',
    position: 'absolute',
    backgroundColor: theme.palette.primary[50]
  },
  [theme.breakpoints.down(500)]: {
    '& .MuiFormControlLabel-root': {
      display: 'none'
    }
  }
}));
const ContentWrapper = styled('div')(({
  theme
}) => ({
  zIndex: 1,
  maxWidth: 430,
  marginTop: 85,
  textAlign: 'center',
  '.content': {
    paddingBlock: '1rem'
  },
  '.social-icons': {
    marginTop: '1rem'
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 20,
    paddingRight: 20
  }
}));
const ImageWrapper = styled('div')(({
  theme
}) => ({
  width: 80,
  height: 80,
  margin: 'auto',
  borderRadius: '50%',
  border: `2px solid ${theme.palette.common.white}`
}));
const StyledFormControlLabel = styled(FormControlLabel)({
  gap: 8,
  top: 140,
  right: 5,
  position: 'absolute',
  flexDirection: 'row-reverse',
  '& .MuiTypography-root': {
    fontSize: 14,
    color: 'text.secondary',
    lineHeight: 1
  }
});
export default function UserBio() {
  return <MainWrapper>
      <ContentWrapper>
        <ImageWrapper>
          <img src="/static/user/user-11.png" alt="Team Member" width="100%" />
        </ImageWrapper>

        <StyledFormControlLabel label="Notifications" control={<Switch size="small" defaultChecked={true} />} />

        <div className="content">
          <Typography variant="h6">Pixy Krovasky</Typography>

          <Typography variant="body2" color="text.secondary">
            UI/UX Designer
          </Typography>

          <FlexBetween py={3} margin="auto" maxWidth={280}>
            <FlexBox alignItems="center" gap={1}>
              <People color="primary" fontSize="small" />
              <Typography variant="body2" fontWeight={500}>
                500+ Followers
              </Typography>
            </FlexBox>

            <FlexBox alignItems="center" gap={1}>
              <CheckCircleOutline color="error" fontSize="small" />
              <Typography variant="body2" fontWeight={500}>
                75 projects
              </Typography>
            </FlexBox>
          </FlexBetween>

          <Typography variant="body2" color="text.secondary">
            Hey everyone, I am a product manager from New York and I am looking for new
            opportunities in the software business.
          </Typography>

          <div className="social-icons">
            <IconButton>
              <FacebookOutlined color="primary" />
            </IconButton>

            <IconButton>
              <Twitter color="info" />
            </IconButton>

            <IconButton>
              <Instagram color="warning" />
            </IconButton>

            <IconButton>
              <SportsBasketball color="error" />
            </IconButton>
          </div>
        </div>
      </ContentWrapper>
    </MainWrapper>;
}