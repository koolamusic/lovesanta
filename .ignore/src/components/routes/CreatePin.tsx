import React from 'react';
import {
  Alert,
  AlertIcon,
  FormLabel,
  Heading,
  Button,
  Flex,
  PinInput,
  PinInputField,
  HStack,
  PinInputProps,
} from '@chakra-ui/react';
import { Container } from '../Container';

export interface IItem {
  label: string;
  value: string;
}

const PinHolder = (props: PinInputProps) => (
  <HStack>
    <PinInput size='lg' {...props}>
      <PinInputField />
      <PinInputField />
      <PinInputField />
      <PinInputField />
    </PinInput>
  </HStack>
);

const AuthPage = () => {
  const [isSubmitting, setSubmitting] = React.useState<boolean>(false);
  const [userPin, setUserPin] = React.useState('');

  const createPinAccess = (val: any) => {
    console.log(val);
    setSubmitting(true);
  };

  return (
    <Container minH='100vh'>
      <Flex direction='column' width='100%'>
        {/* <Flex alignItems="center" direction="column"> */}
        <Flex mt='12' pt='12' />
        <Heading textAlign='center' as='h2' color='gray.600' my='6'>
          Love Dip
        </Heading>
        <Alert status='info' my='4'>
          <AlertIcon />
          Hello: since this is your first time, Create a new Secure Pin 😀
        </Alert>
        <FormLabel color='gray.700' margin='0' mt='4' pb='2'>
          Your Secure pin
        </FormLabel>
        <PinHolder onChange={(input) => setUserPin(input)} onComplete={(val) => createPinAccess(val)}>
          <></>
        </PinHolder>
        <Button onClick={() => createPinAccess(userPin)} size='lg' isLoading={isSubmitting} w={'full'} mt='8' colorScheme='teal'>
          Create Secure Pin
        </Button>
      </Flex>
    </Container>
  );
};

export default AuthPage;
