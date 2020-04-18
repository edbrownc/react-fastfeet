import React from 'react';
import PropTypes from 'prop-types';

import { Background, Container, Content } from './styles';

export default function ViewIssue({ Issue, handleClickBackground }) {
  function handleContainerClick(event) {
    event.stopPropagation();
  }

  return (
    <Background onClick={handleClickBackground}>
      <Container onClick={handleContainerClick}>
        <Content>
          <h1>Issue Info</h1>
          <small>{Issue.description}</small>
        </Content>
      </Container>
    </Background>
  );
}

ViewIssue.propTypes = {
  Issue: PropTypes.string.isRequired,
  handleClickBackground: PropTypes.func.isRequired,
};
