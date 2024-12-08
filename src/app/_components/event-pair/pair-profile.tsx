import {
    Container,
    Float,
    Heading,
    HStack,
    Icon,
    Box,
    Image,
    Badge,
    IconButton,
    Span,
    Text,
    VStack,
  } from '@chakra-ui/react'
import { FiHeart, FiMessageCircle } from "react-icons/fi";
  import { LuBadgeCheck, LuBriefcase, LuGlobe, LuLinkedin, LuMapPin, LuTwitter } from 'react-icons/lu'
  import { Avatar } from '~/components/ui/avatar'
  import { Button } from '~/components/ui/button'
  
  export const PairProfile = () => {
    return (
        <VStack gap="6" textAlign="center">
<ProfileCard/>


  {/* ----------- show the count metadata with pair subtitle -------------- */}
      <HStack
        w={"full"}
        alignSelf={"flex-start"}
        align={"center"}
        justifyContent={"space-between"}
      >
        <Text fontFamily={"heading"} textAlign={"left"} mb={0}>
          Your Pair:
        </Text>

        <Text
          color={"teal.500"}
          alignSelf={"flex-end"}
          textAlign={"right"}
          fontFamily={"heading"}
        >
          {3} Tries left
        </Text>
      </HStack>
      {/* ----------- show the count metadata with pair subtitle -------------- */}

    
  

<VStack gap="2" align={'flex-start'} textAlign="left" fontSize={'sm'}>
          <HStack fontWeight="medium" w={'full'} bg="bg.muted" gap="0" rounded="lg" px="3" py="1">
            <Span color="fg.muted">1/</Span>
            <Span>You can only generate a new pair thrice (3 times)</Span>
          </HStack>
          <HStack fontWeight="medium" w={'full'} bg="bg.muted" gap="0" rounded="lg" px="3" py="1">
            <Span color="fg.muted">2/</Span>
            <Span>If you don&apos;t like your match, generate a new one</Span>
          </HStack>
          <HStack fontWeight="medium" bg="bg.muted" gap="0" rounded="lg" px="3" py="1">
            <Span color="fg.muted">3/</Span>
            <Span>Viewing your match might cost you a count</Span>
          </HStack>
  </VStack>
        </VStack>
    )
  }
  
  const data = {
    name: 'Elena Doe',
    location: 'New York, NY',
    username: 'elena',
    image: 'https://i.pravatar.cc/300?u=20',
    description:
      'Product Designer & Developer with over 8 years of experience. Leading design systems at Ipsum Technologies.',
    social: [
      {
        label: 'LinkedIn',
        icon: <LuLinkedin />,
        url: '#',
      },
      {
        label: 'Twitter',
        icon: <LuTwitter />,
        url: '#',
      },
      {
        label: 'Website',
        icon: <LuGlobe />,
        url: '#',
      },
    ],
  }
  

const pairName ="Elena Doe"


const ProfileCard = () => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={{ base: "white", _dark: "gray.800"}}
      boxShadow="lg"
      position="relative"
    >
      {/* Image Section */}
      <Box position="relative">
        <Image
          src="https://via.placeholder.com/400x600"
          alt="Profile"
          objectFit="cover"
          height="400px"
          width="full"
        />
        <Box
          position="absolute"
          top="10px"
          left="10px"
          bg="yellow.400"
          w="35px"
          h="35px"
          borderRadius="full"
        ></Box>
        <Box
          position="absolute"
          top="10px"
          right="10px"
          display="flex"
          flexDirection="column"
          gap="8px"
        >
          <IconButton
            aria-label="Message"
            bg="white"
            color="gray.800"
            boxShadow="sm"
            size="sm"
          >
            <FiMessageCircle />
          </IconButton>
        </Box>
      </Box>

      {/* Content Section */}
      <VStack align="start" spaceY={2} p={4}>
        {/* Name and Distance */}
        <Text fontSize="xl" fontWeight="bold">
          Peggie, 23{" "}
          <Badge ml="1" colorScheme="green">
            Online
          </Badge>
        </Text>
        <Text fontSize="sm" color="gray.500">
          ~300ft from you
        </Text>

        {/* Tags */}
        <HStack spaceX={2}>
          {["Modelling", "Hiking", "Drawing", "Photo", "Design"].map((tag) => (
            <Badge
              key={tag}
              px={2}
              py={1}
              borderRadius="full"
              bg="gray.100"
              color="gray.800"
            >
              {tag}
            </Badge>
          ))}
        </HStack>

        {/* Bio */}
        <Text fontSize="sm" color="gray.700">
        {pairName.charAt(0).toUpperCase() + pairName.slice(1)} will be
            expecting a gift from you this Christmas, they dont have to know
            that you&apos;ve been paired to buy them a gift. do well to buy them
            something lovely or click the button below to see what they&apos;ll
            like
        </Text>
      </VStack>

      {/* Action Buttons */}
      <HStack justify="space-between" px={4} py={2}>
        <Button
          bg="gray.800"
          color="white"
          _hover={{ bg: "gray.700" }}
        >
          Like
          <FiHeart />
        </Button>
        <Button
          bg="purple.500"
          color="white"
          _hover={{ bg: "purple.400" }}
        >
          Chat
          <FiMessageCircle />
        </Button>
      </HStack>
    </Box>
  );
};

