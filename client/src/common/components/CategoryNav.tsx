import React from "react";
import { Flex } from "@chakra-ui/react";
import CustomLink from "./UI/CustomLink";

const CategoryNav = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      p={2}
      gap={8}
      color="quaternary"
      backgroundColor="secondary"
      overflowX="clip"
    >
      <CustomLink link="All Categories" url="/categories" mx={4} />
      <CustomLink link="Smartphones" url="/categories" mx={4} />
      <CustomLink link="Laptops" url="/categories" mx={4} />
      <CustomLink link="Gaming" url="/categories" mx={4} />
      <CustomLink link="Cameras" url="/categories" mx={4} />
      <CustomLink link="Misc Gadgets" url="/categories" mx={4} />
    </Flex>
  );
};

export default CategoryNav;
