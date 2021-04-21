import styled from 'styled-components';

export const Container = styled.section`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;


  @media (min-width: ${({ theme }) => theme.screen.xxsm}) {
    max-width: 320px;
  }

  @media (min-width: ${({ theme }) => theme.screen.sm}) {
    max-width: 540px;
  }

  @media (min-width: ${({ theme }) => theme.screen.md}) {
    max-width: 720px;
  }

  @media (min-width: ${({ theme }) => theme.screen.lg}) {
    max-width: 1080px;
  }
`;