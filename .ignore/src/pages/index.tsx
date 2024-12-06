import React from 'react';
import { Container } from '../components/Container';

/* Import Page Components here */
import DefaultAccess from '../components/routes/Access';

export default function View(props: any): JSX.Element {
  return (
    <Container minH='100vh'>
      <DefaultAccess {...props} />
    </Container>
  );
}
