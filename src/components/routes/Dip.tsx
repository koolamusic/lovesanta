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
    const toast = useToast()

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
            if (!sessionUser.id && !sessionUser.name && !sessionUser.pin) {
                await setSubmitting(false)
                // window.location.reload()
                throw new Error("You have been logged out, refresh to login")
            }

            const response = await axios.post<IRecordResponse[]>('/api/pair', {
                params: {
                    userId: sessionUser.id,
                    name: sessionUser.name,
                    pin: sessionUser.pin,
                    count: sessionUser.count,
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
                /* Manage the API Response here */
                await isMounted && setUser(response.data[0])
                await setSubmitting(false)
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
            <Heading textAlign="center" as="h2" color="gray.600" my="0">Your Pair is:</Heading>
            <Text color="red.600" fontWeight="bold" textAlign="center" maxW="30rem" mb="6">{sessionUser.count} Tries remaining</Text>
            {/* <Text color="gray.600" textAlign="center" maxW="30rem" mb="6">Keep calm, let us pair you with a lovely human</Text> */}

            <Alert status="success" border="1px dashed" borderColor="ButtonShadow">
                <Box flex="1">
                    <AlertTitle fontSize="2rem" my="6" textAlign="center" textTransform="capitalize">{sessionUser.pairName}</AlertTitle>
                    <AlertDescription display="block" pb="3">
                        Hey Friend, <strong style={{ color: "##ff3092", textTransform: 'capitalize' }}>{sessionUser.pairName} </strong>
                        {/* {sessionUser.name.charAt(0).toUpperCase() + sessionUser.name.slice(1)} */}
                          will be expecting a wonderful gift from you this Christmas, do well to buy them something lovely
                </AlertDescription>
                </Box>
            </Alert>



            <Button isLoading={isSubmitting} isDisabled={sessionUser.count > 2} onClick={pairAction} size="lg" isFullWidth mt="8" colorScheme="teal">Generate New Pair</Button>
            <Alert status="warning" mt="1">
                <AlertIcon />
                    Warning: You can only generate a new pair twice (2 times)
                </Alert>


            <DarkModeSwitch />
        </Container>
    )

}

export default DipPage
