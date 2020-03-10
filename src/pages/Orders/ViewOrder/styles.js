import styled from 'styled-components';

export const Container = styled.div`
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
export const Content = styled.div`
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
`;
