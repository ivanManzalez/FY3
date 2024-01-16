import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

export default function Carousel2() {
  return (
    <>
      <Swiper
        cssMode={true}
        slidesPerView={5}
        spaceBetween={10}
        pagination={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 00</SwiperSlide>
        <SwiperSlide>Slide 01</SwiperSlide>
        <SwiperSlide>Slide 02</SwiperSlide>
        <SwiperSlide>Slide 03</SwiperSlide>
        <SwiperSlide>Slide 04</SwiperSlide>
        <SwiperSlide>Slide 05</SwiperSlide>
        <SwiperSlide>Slide 06</SwiperSlide>
        <SwiperSlide>Slide 07</SwiperSlide>
        <SwiperSlide>Slide 08</SwiperSlide>
        <SwiperSlide>Slide 09</SwiperSlide>
        
      </Swiper>
    </>
  );
}
