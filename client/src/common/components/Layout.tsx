import React, { ReactNode } from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "../theme";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Navbar />
      {children}
      <Footer />
    </ChakraProvider>
  );
};

export default Layout;
