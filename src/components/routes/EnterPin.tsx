import React from 'react'
import axios from 'axios'
// import { CUIAutoComplete } from 'chakra-ui-autocomplete'

import {
    Link as ChakraLink,
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


const AccessPage = () => {
    const [userName, setName] = React.useState('');
    const [userPin, setPin] = React.useState('');
    const toast = useToast()




    // const [pickerItems, setPickerItems] = React.useState(family);
    // const [selectedItems, setSelectedItems] = React.useState<IItem[]>([]);

    // const handleCreateItem = (item: IItem) => {
    //     setPickerItems((curr) => [...curr, item]);
    //     setSelectedItems((curr) => [...curr, item]);
    // };

    // const handleSelectedItemsChange = (selectedItems?: IItem[]) => {
    //     if (selectedItems) {
    //         setSelectedItems(selectedItems);
    //     }
    // };


    const getUser = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        console.log(userName, userPin)

        try {
            const response = await axios.put<IUser[]>('/api/access/user', {
                params: {
                    name: userName,
                    pin: userPin,
                }
            });
            if (response.data[0] === undefined) {
                toast({
                    title: "Access Denied.",
                    description: "check your name and pin",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })

            }
            // if (response.data[0].isActivated === undefined && response.data[0].pin !== undefined) {
            //     alert("Your Account Pin is " + response.data[0].pin + " Keep it safe")

            // }
            console.log(response.data[0])

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
        <>
            <Flex mt="12" pt="12" />
            <Heading textAlign="center" as="h2" color="gray.600" my="6">Love Dip</Heading>
            <form onSubmit={getUser}>
                <Alert status="info" my="4">
                    <AlertIcon />
                If this is your first time, Create a new Secure Pin
            </Alert>
                <FormLabel color="gray.700" margin="0">Your name</FormLabel>
                <Select size="lg" onChange={(v: any) => setName(v.target.value)} placeholder="Who are you?">
                    {family.map((val, index) => (
                        <option key={index + "-" + val.value} value={val.value}>{val.label}</option>
                    ))}
                </Select>
                {/* <CUIAutoComplete name="name" isFullWidth placeholder="Your name" size="lg" mb="2" /> */}

                <FormLabel color="gray.700" margin="0" mt="4">Your Secure pin</FormLabel>
                <PinHolder onComplete={(val) => setPin(val)}><></></PinHolder>
                <Button type="submit" size="lg" isFullWidth mt="8" colorScheme="teal">Start</Button>
            </form>

        </>
    )
}

export default AccessPage
