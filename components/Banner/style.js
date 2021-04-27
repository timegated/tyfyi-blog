import styled from 'styled-components';
import { Container } from '../globalStyles/global';

export const BannerContainer = styled.section`
  background: ${({ theme }) => theme.color.main.grayseven};
  padding: 2.5rem 1.65rem;
  border-bottom-left-radius: 50% 50%;
  border-bottom-right-radius: 50% 50%;
  width: 100%;
  text-align: center;
`;

export const BannerTitle = styled.h1`
  color: ${({theme}) => theme.color.accents.grayone};
  font-size: ${({theme}) => theme.font_size.lg};
`;

export const BannerSubtitle = styled.span`
  color: ${({theme}) => theme.color.accents.primary};
  font-size: ${({theme}) => theme.font_size.reg};
`;