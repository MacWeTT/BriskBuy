import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import Router from "next/router";

interface CustomButtonProps extends ButtonProps {
  variant: string;
  text: string;
  route?: string;
  props?: ButtonProps;
}

const CustomButton = ({
  variant,
  text,
  route,
  onClick,
  ...props
}: CustomButtonProps) => {
  const handleButtonRouting = () => {
    if (route) {
      Router.push(route);
    }
  };

  switch (variant) {
    case "border":
      return (
        <Button
          border="2px"
          borderColor="primary"
          color="primary"
          bg="transparent"
          size="md"
          _hover={{
            boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
            bg: "tertiary",
            color: "quaternary",
          }}
          _focus={{ boxShadow: "none" }}
          _active={{
            transform: "scale(0.98)",
          }}
          onClick={route ? handleButtonRouting : onClick}
          {...props}
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
          onClick={route ? handleButtonRouting : onClick}
          {...props}
        >
          {text}
        </Button>
      );
    default:
      break;
  }
};

export default CustomButton;
