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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return <Slider {...settings}>{children}</Slider>;
};

export default SliderComponent;
