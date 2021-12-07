import React from 'react';
import {
  useToast,
  FormLabel,
  VStack,
  Button,
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
          <FormLabel margin='0' mt='4' pb='4'>
            {' '}
            {store.name.toUpperCase()}, Enter your Pin Abeg 😀
          </FormLabel>

          <PinHolder onChange={(input) => setUserPin(input)} onComplete={(val) => _handleSubmission(val)}>
            <></>
          </PinHolder>
        </VStack>
      </Center>
      <Button onClick={() => _handleSubmission(userPin)} isLoading={isAccessing} isFullWidth mt='8'>
        Unlock
      </Button>
    </Flex>
  );
};

export default AuthPage;
