import React from 'react';

import { Container } from '../Container';
import {
  AlertIcon,
  Heading,
  Button,
  Flex,
  Alert,
  AlertDescription,
  AlertTitle,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { IRecordResponse } from '../../lib/interface';
// import usePair from '@/hooks/usePair';
// import { useStore } from '@/lib/store';
import { PairPreviewBox } from '@/components/display/PairPreviewBox';
import PairPreferenceDrawer from '@/components/display/PairPreferenceDrawer';


const DipPage = ({ user }: {user: IRecordResponse}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const store = useStore((state) => state);

  // const toast = useToast();

  const _handleSubmission = () => {
    return;
  };

  console.log(user)



  return (
    <Container height='100vh'>
      <Flex mt='12' pt='12' />
      {!user.pairName && (
        <Heading as='h6' textAlign='center' fontSize='2rem'>
          You currently don&apos;t have an pair yet
        </Heading>
      )}

  {/* //////////////////If we have a pair lets preview this box ////////////// */}
      {user.pairId && <PairPreviewBox name={user.name} pairName={ user.pairName} />}
<Button mb={6} mt={2} size={'sm'} boxShadow={'none'} onClick={onOpen}>Check what your pair wants</Button>
      <Button
        // isLoading={isSubmitting}
        isDisabled={user.count > 2}
        onClick={_handleSubmission}
        isFullWidth
        mt='8'
      >
        Generate New Pair
      </Button>

      {/* Instruction set */}
      <Alert
        display={'flex'}
        flexDir={'column'}
        alignItems={'flex-start'}
        border={'1px'}
        variant={useColorModeValue('solid', 'outline')}
        borderRadius={'md'}
        colorScheme={'teal'}
        mt={6}
      >
        <Flex align={'center'} py={2}>
          <AlertIcon />
          <AlertTitle mt={1}>Instructions</AlertTitle>
        </Flex>

        <AlertDescription fontSize={'md'} mb={2} mt={1}>1. You can only generate a new pair thrice (3 times)</AlertDescription>

        <AlertDescription fontSize={'md'} maxW='30rem' mb={1}>
          2. If you don&apos;t like your pair, you have {3 - user.count} Tries remaining to generate a new one
        </AlertDescription>
        <AlertDescription fontSize={'md'} mb={1} pb={6}>3. Viewing your pair&apos;s preference will cost you one count, so use it wisely</AlertDescription>
      </Alert>
      {/*  --------------------- Instruction set ---------------------  */}

      {/* -------  Show the users preferences in a drawer ------ */}
      <PairPreferenceDrawer pref={user.preferences} isOpen={isOpen} onDrawerClose={onClose} />
    </Container>
  );
};

export default DipPage;
