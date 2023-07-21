import React from "react";
import { Box, ChakraProps } from "@chakra-ui/react";

interface PageWrapperProps extends ChakraProps {
  children: React.ReactNode;
  props?: ChakraProps;
}

const PageWrapper = ({ children, ...props }: PageWrapperProps) => {
  return (
    <Box minHeight="100vh" maxWidth="100vw" overflowX="hidden">
      {children}
    </Box>
  );
};

export default PageWrapper;
