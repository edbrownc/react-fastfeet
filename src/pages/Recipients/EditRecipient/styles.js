import styled from 'styled-components';

export const GridContainer = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 4px;
`;

export const RowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  grid-gap: 20px;

  label {
    font-weight: bold;
  }

  input {
    margin: 5px 0 10px 0;
    height: 35px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 40px;
    padding-left: 10px;
    color: #444;
  }

  *:nth-child(${props => props.spanColumn}) {
    grid-column: span ${props => props.spanSize};
  }
`;
