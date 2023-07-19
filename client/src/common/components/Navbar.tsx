import React from "react";
import Link from "next/link";

//UI Components
import { Flex } from "@chakra-ui/react";
import CustomText from "./UI/CustomText";
import CustomLink from "./UI/CustomLink";
import CategoryNav from "./CategoryNav";

//React-Icons
import { BiCurrentLocation, BiBookmark } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
  return (
    <>
      <Flex
        as="nav"
        position="sticky"
        justify="space-between"
        p={5}
        bgColor="primary"
        color="quaternary"
      >
        <Flex justifyContent="center" alignItems="center">
          <CustomLink link="BriskBuy" url="/" mr={4} />
          <Link href="/profile">
            <Flex justifyContent="center" alignItems="center">
              <BiCurrentLocation />
              <CustomText variant="paragraph" text="Lucknow" px="1" />
            </Flex>
          </Link>
        </Flex>
        <Flex justifyContent="center" alignItems="center">
          <CustomLink url="/profile" link="Manas" />
          <Link href="/cart">
            <Flex
              position="relative"
              justifyContent="center"
              alignItems="center"
              fontSize="32"
              px="1"
              mx="2"
              _hover={{
                transform: "scale(1.1)",
              }}
            >
              <AiOutlineShoppingCart />
              <Flex
                borderRadius="9999px"
                bgColor="tertiary"
                color="quaternary"
                position="absolute"
                right="-5px"
                top="-5px"
                p="1"
                fontSize="12"
                w="20px"
                h="20px"
                alignItems="center"
                justifyContent="center"
              >
                1
              </Flex>
            </Flex>
          </Link>
          <Link href="/wishlist">
            <Flex
              position="relative"
              justifyContent="center"
              alignItems="center"
              fontSize="32"
              px="1"
              mx="2"
              _hover={{
                transform: "scale(1.1)",
              }}
            >
              <BiBookmark />
              <Flex
                borderRadius="9999px"
                bgColor="tertiary"
                color="quaternary"
                position="absolute"
                right="-5px"
                top="-5px"
                p="1"
                fontSize="12"
                w="20px"
                h="20px"
                alignItems="center"
                justifyContent="center"
              >
                1
              </Flex>
            </Flex>
          </Link>
        </Flex>
      </Flex>
      <CategoryNav />
    </>
  );
};

export default Navbar;
