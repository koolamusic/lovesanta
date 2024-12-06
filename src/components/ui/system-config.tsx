import { createSystem, defaultConfig } from "@chakra-ui/react";
import { defineTextStyles } from "@chakra-ui/react"

export const textStyles = defineTextStyles({
  body: {
    description: "The body text style - used in paragraphs",
    value: {
      fontFamily: "var(--font-geist-sans)",
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "24",
      letterSpacing: "0",
      textDecoration: "None",
      textTransform: "None",
    },
  },
})

export const systemConfig = createSystem(defaultConfig, {
  cssVarsPrefix: "xk",

  theme: {
      textStyles,
    breakpoints: {
      sm: "40em",
      md: "52em",
      lg: "69em",
      xl: "96em",
      "2xl": "134em",
    },
    tokens: {
      colors: {
        brand: {
          50: { value: "#e6f2ff" },
          100: { value: "#e6f2ff" },
          200: { value: "#bfdeff" },
          300: { value: "#99caff" },
          950: { value: "#001a33" },
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: "{colors.brand.500}" },
          contrast: { value: "{colors.brand.100}" },
          fg: { value: "{colors.brand.700}" },
          muted: { value: "{colors.brand.100}" },
          subtle: { value: "{colors.brand.200}" },
          emphasized: { value: "{colors.brand.300}" },
          focusRing: { value: "{colors.brand.500}" },
        },
      },
    },
  },
  globalCss: {
    "html, #__next": {
      height: "100%",
      fontFamily: "Blimone",
      letterSpacing: ".3px",
    },
    p: {
      fontFamily: "Blimone",
    },
    "body": {
      overflowY: "scroll", // Always show scrollbar to avoid flickering
      paddingBottom: "100px",
      fontFamily: "'Blimone'",
      fontWeight: "400",
    },
    html: {
      scrollBehavior: "smooth",
    },
  },
});
