import styled from 'styled-components';
import AsyncSelect from 'react-select/async';
import { MenuItem } from '@material-ui/core';
import { MdVisibility, MdEdit, MdDelete } from 'react-icons/md';

export const Wrapper = styled.div`
  min-height: 100%;
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
    border-collapse: separate;
    border-spacing: 0 1em;
    width: 80%;
    text-align: left;

    th:last-child {
      text-align: right;
    }

    th {
      padding-left: 20px;
    }

    tbody {
      color: #999;

      tr {
        background: #fff;
        height: 57px;
      }

      td {
        padding-left: 20px;

        div {
          display: flex;
          align-items: center;
        }
      }

      td:last-child {
        text-align: right;
      }
    }
  }
`;

export const Pagination = styled.div`
  padding-top: 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    transition: opacity 0.25s ease-out;
    border-radius: 4px;
    outline: 0;
    border: 0;
    padding: 8px;
    margin: 0 10px 0 10px;
    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
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

export const StyledMenuItem = styled(MenuItem)`
  span {
    margin-left: 10px;
    color: #999;
  }
`;

export const PurpleViewIcon = styled(MdVisibility)`
  color: #8e5be8;
`;

export const BlueEditIcon = styled(MdEdit)`
  color: #4d85ee;
`;

export const RedDeleteIcon = styled(MdDelete)`
  color: #de3b3b;
`;

export const StyledAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  text-align: center;
  background-color: #f4effc;
  color: #a28fd0;
  margin-right: 10px;
`;
