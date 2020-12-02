import React from 'react'
import axios from 'axios'
import { useRealm } from 'use-realm'
import { STEP, SESSION_USER } from '../realm'

import {
    useToast,
    Select,
    FormLabel,
    Heading,
    Button,
    Flex,
} from '@chakra-ui/react'
import { IRecordResponse } from '../../pages/api/interface'

export interface IItem {
    label: string;
    value: string;
}

const family: IItem[] = [
    { value: 'blessing', label: 'Blessing' },
    { value: 'bobo', label: 'Bobo' },
    { value: 'bukola', label: 'Bukola' },
    { value: 'chike', label: 'Chike' },
    { value: 'ezinne', label: 'Ezinne' },
    { value: 'joy', label: 'Joy' },
    { value: 'miracle', label: 'Miracle' },
    { value: 'mkpuruoma', label: 'Mkpuruoma' },
    { value: 'nedu', label: 'Nedu' },
    { value: 'princess', label: 'Princess' },
    { value: 'ruth', label: 'Ruth' },
    { value: 'sharon', label: 'Sharon' },
    { value: 'stella', label: 'Stella' },
    { value: 'stephanie', label: 'Stephanie' },
    { value: 'uchechi', label: 'Uchechi' },
    { value: 'winner', label: 'Winner' },
];



const AccessPage = () => {
    const [userName, setName] = React.useState('');
    const [isSubmitting, setSubmitting] = React.useState<boolean>(false)

    const [, setUser] = useRealm<IRecordResponse>(SESSION_USER);
    const [, setStep] = useRealm<string>(STEP);
    const [isMounted, setMount] = React.useState(false);

    React.useEffect(() => {
        setMount(true)
        return () => {
            setMount(false)

        }

    }, [isMounted])




    const toast = useToast()



    const getUser = async (): Promise<void> => {
        console.log(userName)
        setSubmitting(true)

        try {
            const response = await axios.get<IRecordResponse[]>('/api/access/user', {
                params: {
                    name: userName,
                }
            });
            if (response.data[0] === undefined) {
                toast({
                    title: "Access Denied.",
                    description: "invalid request",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })

            }
            /* Initialize user data in session */
            setUser(response.data[0])

            if (response.data[0].isActivated === 'false' && response.data[0].pin === undefined) {
                isMounted && setStep('createPin')
            } else {
                await setStep('authenticate')
                console.log(response.data[0])

            }

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
        <Flex direction="column" maxW="420px" width="100%">
            <Flex mt="12" pt="12" />
            <Heading textAlign="center" as="h2" color="gray.600" my="6">Love Dip</Heading>


            <FormLabel color="gray.700" margin="0">Your name</FormLabel>
            <Select size="lg" onChange={(v: any) => setName(v.target.value)} placeholder="Who are you?">
                {family.map((val, index) => (
                    <option key={index + "-" + val.value} value={val.value}>{val.label}</option>
                ))}
            </Select>
            <Button onClick={getUser} isLoading={isSubmitting} size="lg" isFullWidth mt="8" colorScheme="teal">Start</Button>

        </Flex>
    )
}

export default AccessPage
