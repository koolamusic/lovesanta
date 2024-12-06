"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { systemConfig } from "./system-config";
import { RootStyles } from "./root-styles";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={systemConfig}>
      <RootStyles />
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
