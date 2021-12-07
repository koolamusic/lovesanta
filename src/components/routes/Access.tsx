import React from 'react';
import { useToast, Select, FormLabel, Heading, Button, Flex } from '@chakra-ui/react';
import { FAMILY } from '@/lib/constants';
import useAccess from '@/hooks/useAccess';

const AccessPage = () => {
  const [userName, setName] = React.useState('');
  const { handleAccess, isAccessing } = useAccess();
  const toast = useToast();

  const _handleSubmission = () => {
    return handleAccess({ userName, toast });
  };

  return (
    <Flex direction='column' maxW='420px' width='100%'>
      <Flex mt='12' pt='12' />
      <Heading textAlign='center' as='h2' my='6'>
        Love Dip
      </Heading>

      <FormLabel color='orange.600' margin='0'>
        Who are you?
      </FormLabel>
      <Select size='lg' onChange={(v: any) => setName(v.target.value)} placeholder='Who are you?'>
        {FAMILY.map((val, index) => (
          <option key={index + '-' + val.value} value={val.value}>
            {val.label}
          </option>
        ))}
      </Select>
      <Button onClick={_handleSubmission} isLoading={isAccessing} isFullWidth mt='8'>
        Start
      </Button>
    </Flex>
  );
};

export default AccessPage;
