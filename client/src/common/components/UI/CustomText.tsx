import React from "react";
import { Text, ChakraProps } from "@chakra-ui/react";

interface CustomTextProps extends ChakraProps {
  variant: string;
  text: string;
  props?: ChakraProps;
}

const CustomText = ({ variant, text, ...props }: CustomTextProps) => {
  switch (variant) {
    case "largeHeading":
      return (
        <Text fontSize="6xl" lineHeight="70px" fontWeight="bold" {...props}>
          {text}
        </Text>
      );
    case "heading":
      return (
        <Text fontSize="4xl" lineHeight="50px" fontWeight="semibold" {...props}>
          {text}
        </Text>
      );
    case "subheading":
      return (
        <Text fontSize="2xl" fontWeight="medium" {...props}>
          {text}
        </Text>
      );
    case "paragraph":
      return (
        <Text fontSize="md" fontWeight="normal" {...props}>
          {text}
        </Text>
      );
    default:
      break;
  }
};

export default CustomText;
