import React, { ReactNode } from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "../theme";

interface LayoutProps {
  children: ReactNode;
}

const BlankLayout = ({ children }: LayoutProps) => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      {children}
    </ChakraProvider>
  );
};

export default BlankLayout;
