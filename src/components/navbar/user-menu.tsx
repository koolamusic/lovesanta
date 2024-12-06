import { LuLogOut, LuSettings, LuUser } from 'react-icons/lu'
import { Avatar } from '~/components/ui/avatar'
import { MenuContent, MenuItem, MenuRoot, MenuSeparator, MenuTrigger } from '~/components/ui/menu'

export const UserMenu = () => {
  return (
    <MenuRoot positioning={{ placement: 'bottom' }}>
      <MenuTrigger>
        <Avatar size={'xs'} src="https://i.pravatar.cc/300" />
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="profile">
          <LuUser />
          Profile
        </MenuItem>
        <MenuItem value="settings">
          <LuSettings />
          Settings
        </MenuItem>
        <MenuSeparator />
        <MenuItem value="logout">
          <LuLogOut />
          Logout
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  )
}
