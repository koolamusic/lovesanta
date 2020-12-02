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
    Alert,
    AlertIcon,
    AlertDescription,
    AlertTitle,
    Box,
    CloseButton,
    PinInput,
    PinInputField,
    HStack
} from '@chakra-ui/react'

import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'


const Index = () => (
    <Container height="100vh">
        <Flex mt="12" pt="12" />
        <Heading textAlign="center" as="h2" color="gray.600" my="6">Your Pair</Heading>
        <Text color="gray.600" textAlign="center" maxW="30rem" mb="6">Keep calm, let us pair you with a lovely human</Text>

        <Alert status="success" border="1px dashed" borderColor="ButtonShadow">
            <Box flex="1">
                <AlertTitle fontSize="2rem" my="6">You've been paired!</AlertTitle>
                <AlertDescription display="block" pb="3">
                    Congratulations, //Andrew// will be expecting a wonderful gift from you this Christmas, do well to buy them something lovely
                </AlertDescription>
            </Box>
        </Alert>



        <Button type="submit" size="lg" isFullWidth mt="8" colorScheme="teal">Generate new pair</Button>
        <Alert status="warning" mt="1">
            <AlertIcon />
    Warning: You can only generate a new pair twice (2 times)
  </Alert>


        <DarkModeSwitch />
    </Container>
)

export default Index
