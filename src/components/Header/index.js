import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '~/assets/logo.svg';
import { Container, Content, StyledLink } from './styles';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <StyledLink to="/orders">ORDERS</StyledLink>
          <StyledLink to="/couriers">COURIERS</StyledLink>
          <StyledLink to="/recipients">RECIPIENTS</StyledLink>
          <StyledLink to="/deliveryIssues">ISSUES</StyledLink>
        </nav>

        <aside>
          <div>
            <strong>{user.name}</strong>
            <br />
            <button type="button" onClick={handleSignOut}>
              logout
            </button>
          </div>
        </aside>
      </Content>
    </Container>
  );
}
