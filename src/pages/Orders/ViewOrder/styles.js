import styled from 'styled-components';

export const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;
export const Container = styled.div`
  position: absolute;
  max-width: 450px;
  max-height: 353px;
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  margin: auto;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 0px 10px #00000033;
  padding: 30px;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  color: #666;
  font-size: 14px;

  small {
    font-size: 16px;
  }

  h1 {
    color: #444;
    font-size: 14px;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 16px;
    font-weight: bold;
  }

  hr {
    border: 0;
    height: 1px;
    background: #eee;
    margin: 10px 0 20px;
  }
`;

export const SignatureContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

export const DateItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 5px;
  small {
    margin-left: 5px;
  }
`;
