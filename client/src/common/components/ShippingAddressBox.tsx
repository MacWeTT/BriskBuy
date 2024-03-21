import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import CustomText from "./UI/CustomText";

interface Props {
  ship: {
    id: number;
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
  };
}

const ShippingAddressBox = ({ ship }: Props) => {
  return (
    <Box key={ship.id} bg="gray.200" p={4} rounded="lg">
      <CustomText
        variant="paragraph"
        text={`Street Address: ${ship.street_address}`}
      />
      <CustomText variant="paragraph" text={`City: ${ship.city}`} />
      <CustomText variant="paragraph" text={`State: ${ship.state}`} />
      <CustomText
        variant="paragraph"
        text={`Postal Code: ${ship.postal_code}`}
      />
      <Flex mt={4} mb={2}>
        <Button variant="solid" mr={4} colorScheme="yellow">
          Edit
        </Button>
        <Button variant="solid" colorScheme="red">
          Delete
        </Button>
      </Flex>
    </Box>
  );
};

export default ShippingAddressBox;
