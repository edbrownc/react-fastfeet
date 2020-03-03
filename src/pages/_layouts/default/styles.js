import styled from 'styled-components';
import AsyncSelect from 'react-select/async';

export const Wrapper = styled.div`
  height: 100%;
  background: #f5f5f5;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  header {
    flex: display;
    align-items: left;

    width: 80%;
    margin: 20px 0 20px 0;
    font-size: 20px;
  }

  table {
    border-collapse: collapse;
    width: 80%;
    text-align: left;

    tbody {
      tr {
        background: #fff;
        height: 57px;
      }
    }
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  justify-content: space-between;
  width: 80%;
  margin-bottom: 20px;

  button {
    height: 36px;
    width: 142px;
    background: #7d40e7 0% 0% no-repeat padding-box;
    border-radius: 4px;
    border: none;
    color: #fff;
    font-weight: bold;
  }
`;

export const StyledAsyncSelect = styled(AsyncSelect)`
  width: 300px;
`;
