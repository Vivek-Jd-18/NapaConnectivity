import type { NextPage } from 'next';
import Slider from 'react-slick';

type SliderProps = {
  children: any;
};

const SliderComponent: NextPage<SliderProps> = ({ children }) => {
  const settings = {
    arrows: false,
    centerMode: true,
    centerPadding: '40px',
    slidesToShow: 3,
    infinite: true,
    cssEase: 'linear',
  };
  return <Slider {...settings}>{children}</Slider>;
};

export default SliderComponent;
