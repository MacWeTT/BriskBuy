import React from "react";

import { Grid } from "@chakra-ui/react";

interface SideBarWrapperProps {
  children: React.ReactNode;
}

const SideBarWrapper: React.FC<SideBarWrapperProps> = ({ children }) => {
  return (
    <Grid
      minHeight="100vh"
      maxWidth="100vw"
      overflowX="hidden"
      templateColumns="15% 1fr"
    >
      {children}
    </Grid>
  );
};

export default SideBarWrapper;
