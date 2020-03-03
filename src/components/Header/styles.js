import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    .nav-link[aria-current='page'] {
      color: #000;
      opacity: 1;
    }

    a {
      margin-right: 20px;
    }
  }

  aside {
    display: flex;
    align-items: center;
    color: #666;
    text-align: right;

    button {
      border: none;
      background-color: #fff;
      color: #de3b3b;
      margin-top: 5px;
    }
  }
`;

export const StyledLink = styled(NavLink)`
  font-weight: bold;
  color: #999;
  margin-right: 20px;

  &:hover {
    color: #444;
  }
  &.active {
    color: #444;
  }
`;
