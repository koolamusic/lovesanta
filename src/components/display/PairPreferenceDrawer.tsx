import React from 'react';
import { Drawer, Text, DrawerBody, Box, DrawerContent, DrawerHeader, DrawerOverlay, useColorModeValue } from '@chakra-ui/react';

export default function PairPreferenceDrawer({ isOpen, onDrawerClose, pref }: any) {
  return (
    <Drawer placement={'bottom'} onClose={onDrawerClose} isOpen={isOpen} size={'xl'}>
      <DrawerOverlay />
      <DrawerContent minH={'50%'} borderTop={useColorModeValue('1px solid #eee', '1px solid #111')} borderTopRadius={'10px'}>
        <DrawerHeader maxW={'4xl'} mx={'auto'} fontFamily={'heading'}>
          {'Gift bag preferences'}
        </DrawerHeader>
        <DrawerBody fontSize={'sm'} maxW={'4xl'} mx={'auto'}>
          We asked you all what you would like to receive for christmas, I know you not <strong>Father Christmas 😆 </strong>but
          just in case you know the guy, here is what your pair would like:
          <Box p={8} bg={useColorModeValue('gray.50', 'gray.800')} mt={2} borderRadius={'md'}>
            <Text mt={2} fontSize={'md'} fontFamily={'heading'}>
              {pref}
            </Text>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
