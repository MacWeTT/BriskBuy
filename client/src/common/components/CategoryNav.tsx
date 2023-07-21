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
      <CustomLink link="Apparel" url="/categories/apparel" mx={4} />
      <CustomLink link="Smartphones" url="/categories/smartphones" mx={4} />
      <CustomLink link="Laptops" url="/categories/laptops" mx={4} />
      <CustomLink link="Sports" url="/categories/sports" mx={4} />
      <CustomLink link="Games" url="/categories/games" mx={4} />
      <CustomLink link="Books" url="/categories/books" mx={4} />
      <CustomLink link="Furniture" url="/categories/furniture" mx={4} />
      <CustomLink link="Groceries" url="/categories/groceries" mx={4} />
      <CustomLink link="Cosmetics" url="/categories/cosmetics" mx={4} />
    </Flex>
  );
};

export default CategoryNav;
