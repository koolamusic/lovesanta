import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '~/components/ui/menu'
import { Center, Icon, IconButton } from '@chakra-ui/react'
import { LuMenu } from 'react-icons/lu'
import type { NavItem } from './data'

interface Props {
  items: NavItem[]
  onSelect: (value: string) => void
}

export const NavigationMenu = (props: Props) => {
  const { onSelect, items } = props

  return (
    <MenuRoot onSelect={(e) => onSelect(e.value)}>
      <MenuTrigger asChild>
        <IconButton aria-label="Open Menu" variant="ghost" colorPalette="gray" rounded="full">
          <LuMenu />
        </IconButton>
      </MenuTrigger>
      <MenuContent
        minW="48"
        css={{
          '--color-start': 'colors.purple.solid',
          '--color-end': 'colors.pink.solid',
        }}
      >
        {items.map(({ value, icon: ItemIcon, label }, index) => (
          <MenuItem key={value} value={value} fontWeight="medium" textStyle="sm" gap="2">
            <Center
              boxSize="7"
              borderRadius="l2"
              bg={getGradientMix(index, items.length)}
              color="colorPalette.contrast"
            >
              <Icon size="sm">
                <ItemIcon />
              </Icon>
            </Center>
            {label}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  )
}

const getGradientMix = (index: number, total: number) => {
  const startPercent = 90 - index * (80 / (total - 1))
  const endPercent = 10 + index * (80 / (total - 1))
  return `color-mix(in srgb, var(--color-start) ${startPercent}%, var(--color-end) ${endPercent}%)`
}
