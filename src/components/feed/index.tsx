import { Badge, Container, Flex, HStack, Spacer, Stack, Text, VStack } from '@chakra-ui/react'
import { BsChat, BsChevronUp } from 'react-icons/bs'
import { Avatar } from '~/components/ui/avatar'
import { Status } from '~/components/ui/status'
import { feeds } from './_data'

export const FeedComponent = () => {
  return (
    <Container maxW="3xl" py={{ base: '12', md: '24' }}>
      <Stack gap="6">
        {feeds.map((feed) => (
          <Flex key={feed.id} borderWidth="1px" divideX="1px" borderRadius="l3" bg="bg">
            <Stack p="6" flex="1">
              <Badge variant="surface" alignSelf="flex-start">
                In Progress
              </Badge>
              <Text textStyle="lg" fontWeight="semibold" mt="2">
                {feed.title}
              </Text>
              <Text color="fg.muted" lineClamp={2}>
                {feed.description}
              </Text>

              <HStack fontWeight="medium" mt="4">
                <HStack>
                  <Avatar size="xs" src={feed.authorImage} />
                  <Text textStyle="sm" hideBelow="sm">
                    {feed.authorName}
                  </Text>
                </HStack>
                <Text textStyle="sm" color="fg.muted" ms="3">
                  {feed.createdAt}
                </Text>
                <Spacer />

                <HStack gap="4">
                  <HStack gap="1">
                    <BsChat />
                    <Text textStyle="sm" color="fg.muted">
                      {feed.comments}
                    </Text>
                  </HStack>
                  <Status hideBelow="sm">{feed.tag}</Status>
                </HStack>
              </HStack>
            </Stack>
            <VStack px="4" justify="center" flexShrink="0">
              <BsChevronUp />
              <Text textStyle="sm" fontWeight="semibold">
                {feed.upvotes}
              </Text>
            </VStack>
          </Flex>
        ))}
      </Stack>
    </Container>
  )
}
