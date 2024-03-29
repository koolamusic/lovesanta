import React from 'react';
import { Container } from '../components/Container';

/* Import Page Components here */
import AuthPage from '../components/routes/PinAuthPage';

export default function View(props: any): JSX.Element {
  return (
    <Container minH='100vh'>
      <AuthPage {...props} />
    </Container>
  );
}
