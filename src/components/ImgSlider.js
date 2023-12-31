import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"

import React from 'react'

function ImgSlider(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Carousel {...settings}>
      <Wrap>
        <a>
          <img src="/images/slider-badging.jpg" alt="" />
        </a>
      </Wrap>
      <Wrap>
        <a>
          <img src="/images/slider-scale.jpg" alt="" />
        </a>
      </Wrap>
      <Wrap>
        <a>
          <img src="/images/slider-badag.jpg" alt="" />
        </a>
      </Wrap>
      <Wrap>
        <a>
          <img src="/images/slider-scales.jpg" alt="" />
        </a>
      </Wrap>
    </Carousel>
  )
}


const Carousel = styled(Slider)`
 margin-top: 20px;
 

 ul li button{
 &:before{
  font-size: 10px;
  color: rgba(150,158,171);
 }
}

 li.slick-active button:before{
 color: white;
}

 .slick-list {
  overflow: initial;
}
 .slick-prev{
  margin-left: -75px;
}
 .slick-next{
  margin-right: -75px;
 }
`;

const Wrap = styled.div`

  
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  
 a{
  border-radius: 4px;
  box-shadow: 0 26px 30px -10px rgba(0, 0, 0), 0 16px 10px -10px rgba(0, 0, 0);
  cursor: pointer;
  display: block;
  position: relative;
  padding: 4px;

  img{
    height: 100%;
    width: 100%;
  }
  &:hover{
    padding: 0;
    border: 4px solid rgba(249,249,249,0.8);
    transition: 250ms;
    
  }
}
`;
export default ImgSlider