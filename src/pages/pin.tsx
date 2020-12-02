import React from 'react'
import {
    Link as ChakraLink,
    List,
    ListIcon,
    ListItem,
    Input,
    Text,
    FormLabel,
    Heading,
    Button,
    Flex,
    PinInput,
    PinInputField,
    HStack
} from '@chakra-ui/react'

import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'


const Index = () => (
    <Container height="100vh">
        <Flex mt="12" pt="12" />
        <Heading as="h1" fontSize={['6vw', '2vw']} textAlign="center" color="gray.600" mt="6">Looks like your first time</Heading>
        <Text color="gray.600" textAlign="center" maxW="30rem" mb="6">You need to set a secure pin code only you know to securely access your pair</Text>

        <FormLabel color="gray.700" margin="0" my="4" p="4">Your Secure pin</FormLabel>
        <HStack spacing="4">
            <PinInput size="lg">
                <PinInputField isFullWidth />
                <PinInputField isFullWidth />
                <PinInputField isFullWidth />
                <PinInputField isFullWidth />
            </PinInput>
        </HStack>
        <Button type="submit" size="lg" isFullWidth mt="8" colorScheme="teal">Start</Button>



        <DarkModeSwitch />
    </Container>
)

export default Index
