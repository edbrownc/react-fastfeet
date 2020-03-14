import React from 'react';
import PropTypes from 'prop-types';

import { Background, Container, Content } from './styles';

export default function ViewProblem({ problem, handleClickBackground }) {
  function handleContainerClick(event) {
    event.stopPropagation();
  }

  return (
    <Background onClick={handleClickBackground}>
      <Container onClick={handleContainerClick}>
        <Content>
          <h1>Problem Info</h1>
          <small>{problem.description}</small>
        </Content>
      </Container>
    </Background>
  );
}

ViewProblem.propTypes = {
  problem: PropTypes.string.isRequired,
  handleClickBackground: PropTypes.func.isRequired,
};
