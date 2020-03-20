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
`;

export const StyledTable = styled.table`
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

export const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 99px;
  height: 25px;
  border-radius: 12px;
  color: ${props => {
    if (props.status === 'Pending') return '#C1BC35';

    if (props.status === 'Delivered') return '#2CA42B';

    if (props.status === 'Picked up') return '#4D85EE';

    return '#DE3B3B';
  }};
  background-color: ${props => {
    if (props.status === 'Pending') return '#F0F0DF';

    if (props.status === 'Delivered') return '#DFF0DF';

    if (props.status === 'Picked up') return '#BAD2FF';

    return '#FAB0B0';
  }};
`;

export const StatusCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  text-align: center;
  background-color: ${props => {
    if (props.status === 'Pending') return '#C1BC35';

    if (props.status === 'Delivered') return '#2CA42B';

    if (props.status === 'Picked up') return '#4D85EE';

    return '#DE3B3B';
  }};
  margin-right: 8px;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin-right: 5px;
`;
