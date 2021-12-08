import React from "react"
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/react"

export default function PairPreferenceDrawer({ isOpen, onDrawerClose, pref }: any) {
  return (
      <Drawer placement={'bottom'} onClose={onDrawerClose} isOpen={isOpen} size={'xl'}>
        <DrawerOverlay />
        <DrawerContent minH={'50%'} borderTop={'1px solid #eee'} borderTopRadius={'10px'}>
          <DrawerHeader fontFamily={'heading'}>{'Gift bag preferences'}</DrawerHeader>
          <DrawerBody>
             This persons wants 😆 : {pref}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
  )
}