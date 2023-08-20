import React from "react";
import { Box, ChakraProps } from "@chakra-ui/react";
import Link from "next/link";

interface CustomLinkProps extends ChakraProps {
  link: string;
  url: string;
  props?: ChakraProps;
}

const CustomLink = ({ link, url, ...props }: CustomLinkProps) => {
  return (
    <Link href={url}>
      <Box
        {...props}
        _hover={{
          cursor: "pointer",
          textDecoration: "underline",
          color: "tertiary",
        }}
        textDecoration="underline"
      >
        {link}
      </Box>
    </Link>
  );
};

export default CustomLink;
