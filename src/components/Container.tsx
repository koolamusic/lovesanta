import { Flex, useColorMode, FlexProps } from '@chakra-ui/react';

export const Container = (props: FlexProps) => {
  const { colorMode } = useColorMode();

  // const bgColor = { light: 'gray.50', dark: 'gray.800' }

  const color = { light: 'black', dark: 'white' };
  return (
    <Flex
      direction='column'
      maxW='600px'
      // position="relative"
      // borderX="1px solid"
      padding={['1rem 1rem', '2rem 3rem']}
      margin='auto'
      alignItems='center'
      justifyContent='flex-start'
      // bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    />
  );
};
