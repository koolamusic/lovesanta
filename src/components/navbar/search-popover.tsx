import { IconButton, type IconButtonProps } from '@chakra-ui/react'
import { LuSearch } from 'react-icons/lu'

// TODO: Render a search popover
export const SearchPopover = (props: IconButtonProps) => {
  return (
    <IconButton variant="ghost" rounded="full" colorPalette="gray" {...props}>
      <LuSearch />
    </IconButton>
  )
}
