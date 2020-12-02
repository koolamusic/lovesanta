import React from 'react'
import axios from 'axios'
import { SESSION_USER, STEP } from '../realm'
import { useRealm } from 'use-realm'

import { Container } from '../Container'
import { DarkModeSwitch } from '../DarkModeSwitch'

import {
    useToast,
    AlertIcon,
    Heading,
    Button,
    Flex,
    Text,
    Alert,
    AlertDescription,
    AlertTitle,
    Box
} from '@chakra-ui/react'
import { IRecordResponse } from '../../pages/api/interface'

export interface IItem {
    label: string;
    value: string;
}


const DipPage = () => {
    const [isSubmitting, setSubmitting] = React.useState<boolean>(false)
    const [userPin, setUserPin] = React.useState('');
    const toast = useToast()

    const [, setStep] = useRealm<string>(STEP);
    const [sessionUser, setUser] = useRealm<IRecordResponse>(SESSION_USER);
    const [isMounted, setMount] = React.useState(false);

    React.useEffect(() => {
        setMount(true)
        return () => {
            setMount(false)

        }

    }, [isMounted])


    const pairAction = async (): Promise<void> => {

        try {
            const response = await axios.put<IRecordResponse>('/api/access/user', {
                params: {
                    name: sessionUser.name,
                    pin: sessionUser.pin,
                }
            });
            if (response.data === undefined) {
                toast({
                    title: "Access Denied.",
                    description: "There seems to be an issue",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })

            } else {
                await setUser(response.data)
                await setSubmitting(false)
                setTimeout(() => {
                    isMounted && setStep('dip')
                }, 300);
            }
            console.log(response.data)

        } catch (error) {
            toast({
                title: "Unable to grant your request.",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            })
            console.log(error.message)
        }
    }


    return (
        <Container height="100vh">
            <Flex mt="12" pt="12" />
            <Heading textAlign="center" as="h2" color="gray.600" my="6">Your Pair</Heading>
            {/* <Text color="gray.600" textAlign="center" maxW="30rem" mb="6">Keep calm, let us pair you with a lovely human</Text> */}

            <Alert status="success" border="1px dashed" borderColor="ButtonShadow">
                <Box flex="1">
                    <AlertTitle fontSize="2rem" my="6">You've been paired!</AlertTitle>
                    <AlertDescription display="block" pb="3">
                        Congratulations, {sessionUser.name.charAt(0).toUpperCase() + sessionUser.name.slice(1)} will be expecting a wonderful gift from you this Christmas, do well to buy them something lovely
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

}

export default DipPage
