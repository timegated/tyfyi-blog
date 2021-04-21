import React from 'react';
import {
  BannerContainer,
  BannerTitle,
  BannerSubtitle
} from './style';
 

const Banner = ({title, sub}) => {
  return (
    <BannerContainer>
      <BannerTitle>{title}</BannerTitle>
      <BannerSubtitle>{sub}</BannerSubtitle>
    </BannerContainer>
  )
}

export default Banner
