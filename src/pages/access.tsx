import React from 'react'
import {
    Link as ChakraLink,
    List,
    ListIcon,
    ListItem,
    Input,
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

const PinHolder = () => (
    <HStack spacing="16">
        <PinInput size="lg">
            <PinInputField isFullWidth />
            <PinInputField isFullWidth />
            <PinInputField isFullWidth />
            <PinInputField isFullWidth />
        </PinInput>
    </HStack>
)


const Index = () => (
    <Container height="100vh">
        <Flex mt="12" pt="12" />
        <Heading textAlign="center" as="h2" color="gray.600" my="6">Love Dip</Heading>
        <form>
            <FormLabel color="gray.700" margin="0">Your name</FormLabel>
            <Input name="name" isFullWidth placeholder="Your name" size="lg" mb="2" />

            <FormLabel color="gray.700" margin="0" mt="4">Your Secure pin</FormLabel>
            <PinHolder />
            <Button type="submit" size="lg" isFullWidth mt="8" colorScheme="teal">Start</Button>
        </form>



        <DarkModeSwitch />
    </Container>
)

export default Index
