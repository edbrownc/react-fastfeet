import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content } from './styles';
import Header from '~/components/Header';

export default function RegistrationLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
    </Wrapper>
  );
}

RegistrationLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
