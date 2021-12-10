import { useColorMode, Switch } from '@chakra-ui/react';
import { Container } from './Container';

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  return (
    <Container>
      <Switch position='fixed' top='1rem' right='1rem' colorScheme='yellow' isChecked={isDark} onChange={toggleColorMode} />;
    </Container>
  );
};
