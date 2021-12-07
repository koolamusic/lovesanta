import React from 'react';
import axios from 'axios';
import { SESSION_USER } from '../realm';
import { useRealm } from 'use-realm';
import { AttentionSeeker } from 'react-awesome-reveal';

import { Container } from '../Container';
import { DarkModeSwitch } from '../DarkModeSwitch';

import { useToast, AlertIcon, Heading, Button, Flex, Text, Alert, AlertDescription, AlertTitle, Box } from '@chakra-ui/react';
import { IRecordResponse } from '../../lib/interface';

export interface IItem {
  label: string;
  value: string;
}

const DipPage = () => {
  const [isSubmitting, setSubmitting] = React.useState<boolean>(false);
  const toast = useToast();

  const [sessionUser, setUser] = useRealm<IRecordResponse>(SESSION_USER);
  const [isMounted, setMount] = React.useState(false);

  React.useEffect(() => {
    setMount(true);
    return () => {
      setMount(false);
    };
  }, [isMounted]);

  const pairAction = async (): Promise<void> => {
    await setSubmitting(true);

    try {
      if (!sessionUser.id && !sessionUser.name && !sessionUser.pin) {
        await setSubmitting(false);
        // window.location.reload()
        throw new Error('You have been logged out, refresh to login');
      }

      const response = await axios.post<IRecordResponse[]>('/api/pair', {
        params: {
          userId: sessionUser.id,
          name: sessionUser.name,
          pin: sessionUser.pin,
          count: sessionUser.count,
        },
      });
      if (response.data === undefined) {
        toast({
          title: 'Access Denied.',
          description: 'There seems to be an issue',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        /* Manage the API Response here */
        (await isMounted) && setUser(response.data[0]);
        await setSubmitting(false);
      }
      console.log(response.data);
    } catch (error) {
      toast({
        title: 'Unable to grant your request.',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      console.log(error.message);
    }
  };

  const PairBox: React.FC<{ pairName: string }> = ({ pairName }) => (
    <>
      <Heading textAlign='center' as='h2' color='gray.600' my='0'>
        Your Pair is:
      </Heading>
      {/* <Text color="gray.600" textAlign="center" maxW="30rem" mb="6">Keep calm, let us pair you with a lovely human</Text> */}

      <Alert status='success' border='1px dashed' borderColor='ButtonShadow'>
        <Box flex='1'>
          <AlertTitle fontSize='2rem' my='6' textAlign='center' textTransform='capitalize'>
            <AttentionSeeker>{pairName}</AttentionSeeker>
          </AlertTitle>
          <AlertDescription display='block' pb='3'>
            Hey, <strong style={{ color: '##ff3092', textTransform: 'capitalize' }}>{pairName} </strong>
            {/* {sessionUser.name.charAt(0).toUpperCase() + sessionUser.name.slice(1)} */}
            will be expecting a wonderful gift from you this Christmas, do well to buy them something lovely, they dont have to
            know that you've been paired to buy them a gift
          </AlertDescription>
        </Box>
      </Alert>
    </>
  );

  return (
    <Container height='100vh'>
      <Flex mt='12' pt='12' />
      {!sessionUser.pairName && (
        <Heading as='h6' textAlign='center' fontSize='2rem'>
          You currently don't have an pair yet
        </Heading>
      )}
      <Text color='red.600' fontWeight='bold' textAlign='center' maxW='30rem' mb='6'>
        If you don't like your pair, you have {3 - sessionUser.count} Tries remaining to generate a new one
      </Text>
      {sessionUser.pairId && sessionUser.pairName && <PairBox pairName={sessionUser.pairName} />}

      <Button
        isLoading={isSubmitting}
        isDisabled={sessionUser.count > 2}
        onClick={pairAction}
        size='lg'
        isFullWidth
        mt='8'
        colorScheme='teal'
      >
        Generate New Pair
      </Button>
      <Alert status='warning' mt='1'>
        <AlertIcon />
        Warning: You can only generate a new pair thrice (3 times)
      </Alert>

      <DarkModeSwitch />
    </Container>
  );
};

export default DipPage;
