import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100%;
  background: #f5f5f5;
`;
// Registration layout

export const Container = styled.div`
  margin-top: 40px;
  width: 60%;
  max-width: 800px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  strong {
    font-size: 20px;
  }
`;

export const ButtonsContainer = styled.div`
  button {
    height: 36px;
    width: 112px;
    border-radius: 4px;
    border: none;
    font-weight: bold;
    margin-left: 10px;
  }
  .saveBtn {
    background: #7d40e7 0% 0% no-repeat padding-box;
    color: #fff;
  }

  .backBtn {
    background: #ccc 0% 0% no-repeat padding-box;
    color: #fff;
  }
`;

export const RegContainer = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(2, 1fr);
  background: #fff;
  padding: 30px;
  border-radius: 4px;

  #product {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 40px;
    padding-left: 10px;
    color: #999;
  }

  *:nth-child(4n-1):nth-last-of-type(1) {
    grid-column: span 2;
  }
`;
