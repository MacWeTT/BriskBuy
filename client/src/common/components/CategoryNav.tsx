import React from "react";
import { Flex } from "@chakra-ui/react";
import CustomLink from "./UI/CustomLink";

const CategoryNav = () => {
  return (
    <Flex
      justifyContent="space-evenly"
      alignItems="center"
      p={2}
      color="quaternary"
      backgroundColor="secondary"
      overflowX="clip"
    >
      <CustomLink link="All Categories" url="/categories" mx={4} />
      <CustomLink link="Fresh Harvest" url="/categories/fresh-harvest" mx={4} />
      <CustomLink
        link="Dairy Delights"
        url="/categories/dairy-delights"
        mx={4}
      />
      <CustomLink
        link="Flavours and Condiments"
        url="/categories/flavours-and-condiments"
        mx={4}
      />
      <CustomLink
        link="Refreshments"
        url="/categories/flavours-and-condiments"
        mx={4}
      />
    </Flex>
  );
};

export default CategoryNav;
