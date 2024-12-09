import React from 'react';
import {
  useToast,
  FormLabel,
  VStack,
  Button,
  Text,
  Flex,
  PinInput,
  PinInputField,
  Center,
  HStack,
  PinInputProps,
} from '@chakra-ui/react';
import usePinAuth from '@/hooks/usePinAuth';
import { useStore } from '@/lib/store';

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
      <PinInputField />
      <PinInputField />
    </PinInput>
  </HStack>
);

const AuthPage = () => {
  const [userPin, setUserPin] = React.useState('');
  const { handleAuth, isAccessing } = usePinAuth();
  const store = useStore((state) => state);

  const toast = useToast();

  const _handleSubmission = (value: string) => {
    return handleAuth({ userPin: value, toast });
  };

  return (
    <Flex direction='column' width='100%'>
      <Center>
        <VStack mt={12}>
          <Flex mt='12' pt='12' />
          <FormLabel fontSize={'lg'} margin='0' mt='4'>
            {store.name.toUpperCase()}, Enter your Pin Abeg 😀
          </FormLabel>
          <Text pb={8} textAlign='center'>
            If this is your first time, the number you input will automatically be setup as your new pincode, please keep it safe
          </Text>

          <PinHolder onChange={(input) => setUserPin(input)} onComplete={(val) => _handleSubmission(val)}>
            <></>
          </PinHolder>
        </VStack>
      </Center>
      <Button onClick={() => _handleSubmission(userPin)} isLoading={isAccessing} w={'full'} mt='8'>
        Unlock
      </Button>
    </Flex>
  );
};

export default AuthPage;
