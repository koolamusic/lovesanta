'use client'
import { Text as Logo } from './logo'
import { Container, Flex, Grid, HStack } from '@chakra-ui/react'
import { useState } from 'react'
import { NotificationPopover } from './notification-popover'
import { SearchPopover } from './search-popover'
import { UserMenu } from './user-menu'
import { items } from './data'
import { NavigationMenu } from './navigation-menu'
import { SecondaryNavigation } from './secondary-navigation'

export const NavbarComponent = ({ selectedRoute = 'dashboard'}) => {
  // This is just for demo purposes. Use the router to get the current route and manage state
  const [selected, setSelected] = useState<string>(selectedRoute)
  const secondaryNav = items.find((item) => item.value === selected)?.secondary

  return (
    <Container py={{ base: '4', md: '6', lg: '8' }}>
        <Flex justify="center">
          <SecondaryNavigation items={secondaryNav} />
        </Flex>
    </Container>
  )
}
