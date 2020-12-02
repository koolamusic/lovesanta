import { Flex, useColorMode, FlexProps } from '@chakra-ui/react'
import theme from '../theme'

export const Container = (props: FlexProps) => {
  const { colorMode } = useColorMode()

  const bgColor = { light: 'gray.50', dark: 'gray.800' }

  const color = { light: 'black', dark: 'white' }
  return (
    <Flex
      direction="column"
      maxW="600px"
      borderX="1px solid"
      padding="3rem 2rem"
      borderColor={theme.colors.gray[100]}
      margin="auto"
      alignItems="center"
      justifyContent="flex-start"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    />
  )
}
