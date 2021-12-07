import React from 'react';
import { Container } from '../components/Container';
import { DarkModeSwitch } from '../components/DarkModeSwitch';

/* Import Page Components here */
import DefaultAccess from '../components/routes/Access';

export default function View(props: any): JSX.Element {
  return (
    <Container minW={'6xl'} minH='100vh'>
      <DefaultAccess {...props} />
      <DarkModeSwitch />
    </Container>
  );
}
