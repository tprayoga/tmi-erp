import { useTheme } from '@mui/material/styles';
import SlickCarousel from 'react-slick'; // LOCAL CUSTOM COMPONENTS

import CarouselDots from './components/carousel-dots';
import CarouselArrows from './components/carousel-arrows'; // STYLED COMPONENT

import { RootStyle } from './styles'; // ==============================================================

// ==============================================================
export default function Carousel({
  ref,
  dotColor,
  children,
  arrowStyles,
  dots = true,
  arrows = false,
  slidesToShow = 4,
  spaceBetween = 10,
  dotStyles = {
    mt: 4
  },
  ...others
}) {
  const theme = useTheme();
  const settings = {
    dots,
    arrows,
    slidesToShow,
    rtl: theme.direction === 'rtl',
    ...CarouselArrows({
      sx: arrowStyles
    }),
    ...CarouselDots({
      dotColor,
      sx: dotStyles
    }),
    ...others
  };
  return <RootStyle space={spaceBetween}>
      <SlickCarousel ref={ref} {...settings}>
        {children}
      </SlickCarousel>
    </RootStyle>;
}