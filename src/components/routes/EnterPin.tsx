import React from 'react'
import axios from 'axios'
import { SESSION_USER, STEP } from '../realm'
import { useRealm } from 'use-realm'

import {
    useToast,
    Select,
    Alert,
    AlertIcon,
    FormLabel,
    Heading,
    Button,
    Flex,
    PinInput,
    PinInputField,
    HStack,
    PinInputProps
} from '@chakra-ui/react'
import { IRecordResponse } from '../../pages/api/interface'

export interface IItem {
    label: string;
    value: string;
}


const PinHolder = (props: PinInputProps) => (
    <HStack spacing="16">
        <PinInput size="lg" {...props}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
        </PinInput>
    </HStack>
)


const AuthPage = () => {
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






    const formAction = async (userPin: string): Promise<void> => {

        try {
            const response = await axios.post<IRecordResponse>('/api/access/user', {
                params: {
                    name: sessionUser.name,
                    pin: userPin,
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
                await setUser(Object.assign(sessionUser, response.data))
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

    const createPinAccess = (val: any) => {
        setSubmitting(true)
        formAction(val)
    }


    return (
        <Flex alignItems="center" direction="column">
            <Flex mt="12" pt="12" />
            <Heading textAlign="center" as="h2" color="gray.600" my="6">Love Dip</Heading>
            <form>
                <Alert status="success" my="4">
                    <AlertIcon />
                Hello {sessionUser.name}, Please enter your Pin 😀
            </Alert>
                <FormLabel color="gray.700" margin="0" mt="4" pb="4">Enter your Pin Abeg 😉</FormLabel>
                <PinHolder onChange={(input) => setUserPin(input)} onComplete={(val) => createPinAccess(val)}><></></PinHolder>
                <Button onClick={() => createPinAccess(userPin)} size="lg" isLoading={isSubmitting} isFullWidth mt="8" colorScheme="teal">Check my Pair</Button>
            </form>

        </Flex>
    )
}

export default AuthPage
