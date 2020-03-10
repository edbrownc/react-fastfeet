import React from 'react';

import { Container, Content } from './styles';

export default function ViewOrder({ order }) {
  return (
    <Container>
      <Content>
        <h1>{order.id}</h1>
      </Content>
    </Container>
  );
}
