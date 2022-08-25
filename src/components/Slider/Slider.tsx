/* eslint-disable react/display-name */
import type { NextPage } from 'next';
import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';

type SliderProps = {
  children: any;
  centerMode: boolean;
  slidesToShow?: number;
};

const SliderComponent: NextPage<any, SliderProps> = React.forwardRef(
  ({ children, centerMode, slidesToShow }, ref) => {
    const settings = {
      arrows: false,
      centerMode: centerMode,
      slidesToShow: slidesToShow ? slidesToShow : 3,
      infinite: true,
      // autoplay: true,
      // autoplaySpeed: 1500,
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
          breakpoint: 650,
          settings: {
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };
    const slider = useRef(null);

    const scroll = (e: any) => {
      if (slider === null) return;

      e.wheelDelta > 0
        ? // @ts-ignore
          slider.current && slider.current.slickNext()
        : // @ts-ignore
          slider.current && slider.current.slickPrev();
    };

    useEffect(() => {
      window.addEventListener('wheel', scroll, true);

      return () => {
        window.removeEventListener('wheel', scroll, true);
      };
    }, []);

    return (
      // @ts-ignore
      <Slider {...settings} ref={ref || slider}>
        {children}
      </Slider>
    );
  }
);

export default SliderComponent;
