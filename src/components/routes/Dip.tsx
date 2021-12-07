import React from 'react';
import axios from 'axios';
import { AttentionSeeker } from 'react-awesome-reveal';

import { Container } from '../Container';
import { DarkModeSwitch } from '../DarkModeSwitch';

import { useToast, AlertIcon, Heading, Button, Flex, Text, Alert, AlertDescription, AlertTitle, Box } from '@chakra-ui/react';
import { IRecordResponse } from '../../lib/interface';
import { FAMILY } from '@/lib/constants';
import useAccess from '@/hooks/useAccess';
import { useStore } from '@/lib/store';

const DipPage = () => {
  const [isSubmitting, setSubmitting] = React.useState<boolean>(false);

  const store = useStore((state) => state);

  const [userName, setName] = React.useState('');
  const { handleAccess, isAccessing } = useAccess();
  const toast = useToast();

  const _handleSubmission = () => {
    return handleAccess({ userName, toast });
  };

  // const pairAction = async (): Promise<void> => {
  //   await setSubmitting(true);

  //   try {
  //     if (!store.id && !store.name && !store.pin) {
  //       await setSubmitting(false);
  //       // window.location.reload()
  //       throw new Error('You have been logged out, refresh to login');
  //     }

  //     const response = await axios.post<IRecordResponse[]>('/api/pair', {
  //       params: {
  //         userId: store.id,
  //         name: store.name,
  //         pin: store.pin,
  //         count: store.count,
  //       },
  //     });
  //     if (response.data === undefined) {
  //       toast({
  //         title: 'Access Denied.',
  //         description: 'There seems to be an issue',
  //         status: 'error',
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //     } else {
  //       /* Manage the API Response here */
  //       await setSubmitting(false);
  //     }
  //     console.log(response.data);
  //   } catch (error) {
  //     toast({
  //       title: 'Unable to grant your request.',
  //       description: error.message,
  //       status: 'error',
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //     console.log(error.message);
  //   }
  // };

  const PairBox: React.FC<{ pairName: string }> = ({ pairName }) => (
    <>
      <Heading textAlign='center' as='h2' color='gray.600' my='0'>
        Your Pair is:
      </Heading>
      {/* <Text color="gray.600" textAlign="center" maxW="30rem" mb="6">Keep calm, let us pair you with a lovely human</Text> */}

      <Alert status='success' border='1px dashed' borderColor='ButtonShadow'>
        <Box flex='1'>
          <AlertTitle fontSize='2rem' my='6' textAlign='center' textTransform='capitalize'>
            {/* <AttentionSeeker>{pairName}</AttentionSeeker> */}
          </AlertTitle>
          {/* Hey, <strong style={{ color: '##ff3092', textTransform: 'capitalize' }}>{pairName} </strong> */}
          <AlertDescription display='block' pb='3'>
            {/* {store.name.charAt(0).toUpperCase() + store.name.slice(1)} */}
            will be expecting a wonderful gift from you this Christmas, do well to buy them something lovely, they dont have to
            know that you&apos;ve been paired to buy them a gift
          </AlertDescription>
        </Box>
      </Alert>
    </>
  );

  return (
    <Container height='100vh'>
      <Flex mt='12' pt='12' />
      {/* {!store.pairName && (
        <Heading as='h6' textAlign='center' fontSize='2rem'>
          You currently don&apos;t have an pair yet
        </Heading>
      )} */}
      <Text color='red.600' fontWeight='bold' textAlign='center' maxW='30rem' mb='6'>
        If you don&apos;t like your pair, you have {3 - store.count} Tries remaining to generate a new one
      </Text>
      {/* {store.pairId && store.pairName && <PairBox pairName={store.pairName} />} */}

      <Button
        isLoading={isSubmitting}
        isDisabled={store.count > 2}
        onClick={_handleSubmission}
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
