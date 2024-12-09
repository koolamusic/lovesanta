import {
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "~/components/ui/popover";
import { IconButton, PopoverBody } from "@chakra-ui/react";
import { LuBell } from "react-icons/lu";

export const NotificationPopover = () => {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <IconButton variant="ghost" rounded="full" colorPalette="gray">
          <LuBell />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent maxW="fit-content">
        <PopoverBody>
          <PopoverTitle fontWeight="medium">Notifications</PopoverTitle>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};
