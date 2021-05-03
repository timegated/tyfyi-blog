import styled from 'styled-components';


export const Title = styled.h2`
  color: ${({theme}) => theme.color.main.primary};
`
export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.color.main.primary};

  li {
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 1.5rem 0.25rem;
    border-radius: 10px;
    box-shadow: 0 2px 0.25em ${({theme}) => theme.color.accents.primary};
    max-width: 100%;

    a {
      text-decoration: none;
      color: ${({ theme }) => theme.color.main.secondary};
      font-size: ${({ theme }) => theme.font_size.md};
      font-weight: ${({theme}) => theme.font_weight.bold};
    }
    .post-date {
      font-size: ${({theme}) => theme.font_size.sm};
    }

    @media (min-width: ${({ theme }) => theme.screen.sm}) {
      max-width: 50%;
    }
  }
`;