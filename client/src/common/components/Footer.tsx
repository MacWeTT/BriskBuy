import React from "react";
import { Flex } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      bgColor="primary"
      color="quaternary"
      p={4}
    >
      Copyright MacWeTT 2023. All rights reserved.
    </Flex>
  );
};

export default Footer;
