import React from "react";
import { Button, ChakraProps } from "@chakra-ui/react";

interface CustomButtonProps extends ChakraProps {
  variant: string;
  text: string;
  props?: ChakraProps;
}

const CustomButton = ({ variant, text }: CustomButtonProps) => {
  switch (variant) {
    case "border":
      return (
        <Button
          border="2px"
          borderColor="primary"
          color="primary"
          bg="transparent"
          size="md"
          _hover={{ boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)" }}
          _focus={{ boxShadow: "none" }}
          _active={{
            transform: "scale(0.98)",
          }}
        >
          {text}
        </Button>
      );
    case "solid":
      return (
        <Button
          bgColor="primary"
          color="quaternary"
          size="md"
          _hover={{ bgColor: "tertiary" }}
          _focus={{ boxShadow: "none" }}
          _active={{
            bg: "tertiary",
            transform: "scale(0.98)",
          }}
        >
          {text}
        </Button>
      );
    default:
      break;
  }
};

export default CustomButton;
