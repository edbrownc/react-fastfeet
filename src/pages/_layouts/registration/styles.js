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
  display: flex;
  flex-direction: row;
`;

export const BackButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 112px;
  border-radius: 4px;
  border: none;
  font-weight: bold;
  margin-left: 10px;
  background: #ccc;
  color: #fff;
  padding-right: 7px;
`;

export const SaveButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 112px;
  border-radius: 4px;
  border: none;
  font-weight: bold;
  margin-left: 10px;
  background: #7d40e7;
  color: #fff;
  padding-right: 7px;
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
    color: #444;
  }

  *:nth-child(4n-1):nth-last-of-type(1) {
    grid-column: span 2;
  }
`;

export const RegFormContainer = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 10px;
    }

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 40px;
      padding-left: 10px;
      color: #444;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
`;
