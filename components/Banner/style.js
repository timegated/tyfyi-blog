import styled from 'styled-components';
import { Container } from '../globalStyles/global';

export const BannerContainer = styled.section`
  background: ${({ theme }) => theme.color.main.grayeight};
  padding: 2.5rem;
  border-radius: 10px;
`;

export const BannerTitle = styled.h1`
  color: ${({theme}) => theme.color.accents.tealone};
  font-size: ${({theme}) => theme.font_size.lg};
`;

export const BannerSubtitle = styled.span`
  color: ${({theme}) => theme.color.accents.primary};
  font-size: ${({theme}) => theme.font_size.reg};
`;