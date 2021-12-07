import React from 'react';
import { Text, FormLabel, Heading, Button, Flex, PinInput, PinInputField, HStack } from '@chakra-ui/react';

import { Container } from '../components/Container';
import { DarkModeSwitch } from '../components/DarkModeSwitch';

const Index = () => (
  <Container height='100vh'>
    <Flex mt='12' pt='12' />
    <Heading as='h1' fontSize={['6vw', '2vw']} textAlign='center' mt='6'>
      Looks like your first time
    </Heading>
    <Text textAlign='center' maxW='30rem' mb='6'>
      You need to set a secure pin code only you know to securely access your pair
    </Text>

    <FormLabel margin='0' my='4' p='4'>
      Your Secure pin
    </FormLabel>
    <HStack spacing='4' justify='space-between'>
      <PinInput size='lg'>
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
    <Button type='submit' size='lg' isFullWidth mt='8' colorScheme='teal'>
      Start
    </Button>

    <DarkModeSwitch />
  </Container>
);

export default Index;
