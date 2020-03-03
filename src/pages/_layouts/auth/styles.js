import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 50px 25px 0px 25px;
    width: 360px;
    height: 425px;
    border-radius: 4px;

    img {
      height: 55px;
      margin-bottom: 25px;
    }

    input {
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 45px;
      padding: 0 15px;
      color: #444;
      margin: 0 0 10px;

      &::placeholder {
        color: #999;
      }
    }

    label {
      color: #444;
      align-self: flex-start;
      margin: 5px 0 5px 0;
      font-weight: bold;
    }

    span {
      color: #f65c75;
      align-self: flex-start;
      margin-bottom: 5px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 45px;
      background: #7d40e7;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#7d40e7')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
