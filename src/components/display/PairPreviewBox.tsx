import React from 'react';
import { Heading, Text, Box, VStack } from '@chakra-ui/react';

type PreviewBoxProps = { pairName: string; name: string }
export const PairPreviewBox: React.FC<PreviewBoxProps> = ({ pairName, name}) => (
  <VStack textAlign="center" align="center" spacing={4}>

    <Text  textAlign='center' maxW='30rem' mb={0}>
    Your Pair is:
    </Text>

    <Box w={'100%'} border={'1px'} bg={'blue.700'} px={8} borderRadius={'lg'}>
        <Heading fontSize='2rem' my='6' color={'yellow.200'} textAlign='center' textTransform='capitalize'>
        {pairName}
        </Heading>
    </Box>

      <Box pt={4}>
        <Text display='block' pb='3'>
          Hey, <strong style={{ textTransform: 'capitalize' }}>{name.charAt(0).toUpperCase() + name.slice(1)}, </strong>
          {pairName.charAt(0).toUpperCase() + pairName.slice(1)} will be expecting a wonderful gift from you this Christmas, do well to buy them something lovely, they dont have to know
          that you&apos;ve been paired to buy them a gift
        </Text>
      </Box>
  </VStack>
);
