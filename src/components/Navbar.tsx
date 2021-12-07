import Link from 'next/link';

import { Box, chakra, Icon, Flex, Button, useColorModeValue, Stack, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon, TriangleUpIcon } from '@chakra-ui/icons';

export const RouteLink = chakra(Link);

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box
        position={'fixed'}
        bottom={0}
        borderTop={useColorModeValue('1px solid #eee', '1px solid #232323')}
        w={'100%'}
        bg={useColorModeValue('gray.50', 'gray.800')}
        px={4}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Stack direction={'row'} spacing={7}>
            {/* --- Home Icon ---- */}
            <RouteLink cursor='pointer' colorScheme='yellow' href='/'>
              <Icon cursor={'pointer'} as={TriangleUpIcon} mt={1} fontSize={'1.3rem'} />
            </RouteLink>
            {/* --- Home Icon ---- */}

            <Button size={'sm'} border={'none'} boxShadow={'none'} onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>

          <Flex alignItems={'center'}>
            <Box>DIP</Box>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
