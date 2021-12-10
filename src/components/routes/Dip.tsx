import React, { useEffect } from 'react';
import { Container } from '../Container';
import {
  AlertIcon,
  Heading,
  useToast,
  Button,
  Flex,
  Alert,
  AlertDescription,
  AlertTitle,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { IRecordResponse } from '../../lib/interface';
import usePair from '@/hooks/usePair';
import { useStore } from '@/lib/store';
import { PairPreviewBox } from '@/components/display/PairPreviewBox';
import PairPreferenceDrawer from '@/components/display/PairPreferenceDrawer';
import ConfettiComponent from '@/components/Confetti';

const DipPage = ({ user }: { user: IRecordResponse }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAccessing, handlePair } = usePair();

  /* -------- dependencies --------- */
  const store = useStore((state) => state);
  const toast = useToast();

  useEffect(() => {
    /* Once we retrieve props, lets persist to the app store */
    store.updateUser(user);
  }, [user, store]);

  const _handleSubmission = async () => {
    await handlePair({ user, toast });
  };

  // console.log(user);
  const disableButton = store.count > 2 || user.count > 2 ? true : false

  return (
    <Container height='100vh'>
      <Flex mt='12' pt='12' />
      {!user.pairName && (
        <Heading as='h6' textAlign='center' fontSize='2rem'>
          You currently don&apos;t have an pair yet
        </Heading>
      )}

      {/* //////////////////If we have a pair lets preview this box ////////////// */}
      {user.pairId && (
        <PairPreviewBox count={store.count} isAccessing={isAccessing} name={store.name} pairName={store.pairName} />
      )}
      <Button mb={6} mt={2} minH={'32px'} size={'sm'} boxShadow={'none'} onClick={onOpen}>
        Check what your pair wants
      </Button>
      {/* //////////////////If we have a pair lets preview this box ////////////// */}

      <Button minH={'48px'} isLoading={isAccessing} isDisabled={disableButton} onClick={_handleSubmission} isFullWidth mt='8'>
        Generate New Pair
      </Button>

      {/* Instruction set */}
      <Alert
        display={'flex'}
        flexDir={'column'}
        alignItems={'flex-start'}
        minH={'240px'}
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

        <AlertDescription fontSize={'md'} mb={2} mt={1}>
          1. You can only generate a new pair thrice (3 times)
        </AlertDescription>

        <AlertDescription fontSize={'md'} maxW='30rem' mb={1}>
          2. If you don&apos;t like your pair, you have {3 - store.count} Tries remaining to generate a new one
        </AlertDescription>
        <AlertDescription fontSize={'md'} mb={1} pb={6}>
          3. Viewing your pair&apos;s preference might cost you one count, so use wisely, lol
        </AlertDescription>
      </Alert>
      {/*  --------------------- Instruction set ---------------------  */}

      {/* -------  Show the users preferences in a drawer ------ */}
      <PairPreferenceDrawer pref={store.pairPreference} isOpen={isOpen} onDrawerClose={onClose} />
      {/* -------  Show the users preferences in a drawer ------ */}
      <ConfettiComponent show={isOpen || !isAccessing} />
    </Container>
  );
};

export default DipPage;
