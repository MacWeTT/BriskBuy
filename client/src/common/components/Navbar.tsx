import React, { useState, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";

//UI Components
import { Flex, Box, Input } from "@chakra-ui/react";
import { InputGroup, InputRightElement } from "@chakra-ui/react";
import CustomText from "./UI/CustomText";
import CustomLink from "./UI/CustomLink";
import CategoryNav from "./CategoryNav";

//React-Icons
import { BiCurrentLocation, BiBookmark, BiShoppingBag } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { wishlistItems } = useSelector((state: RootState) => state.wishlist);

  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    console.log(searchInput);
  };
  const handleSearch = () => {
    router.push(`/products?query=${searchInput}`);
  };

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
        <Flex justifyContent="center" alignItems="center" gap={6}>
          <CustomLink link="BriskBuy" url="/" mr={4} />
          <Link href="/profile">
            <Flex justifyContent="center" alignItems="center">
              <BiCurrentLocation />
              <CustomText variant="paragraph" text="Lucknow" px="1" />
            </Flex>
          </Link>
        </Flex>
        <Box>
          <InputGroup>
            <Input
              type="text"
              placeholder="Search for products..."
              bg="white"
              fontSize="lg"
              width="500px"
              color="secondary"
              ml={2}
              onChange={handleSearchInput}
            />
            <InputRightElement>
              <Box
                color="primary"
                bg="quaternary"
                p={2}
                rounded="lg"
                transition="all 0.4s ease-in-out"
                _hover={{ cursor: "pointer", rounded: "full" }}
                onClick={handleSearch}
              >
                <FaSearch />
              </Box>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Flex justifyContent="center" alignItems="center">
          <CustomLink url="/user/profile" link={user.first_name} />
          <Link href="/user/orders">
            <Flex
              position="relative"
              justifyContent="center"
              alignItems="center"
              fontSize="32"
              px="1"
              ml="2"
              _hover={{
                transform: "scale(1.1)",
              }}
            >
              <BiShoppingBag />
            </Flex>
          </Link>
          <Link href="/user/cart">
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
                display={cartItems.length > 0 ? "flex" : "none"}
                borderRadius="9999px"
                bgColor="tertiary"
                color="black"
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
                {cartItems.length}
              </Flex>
            </Flex>
          </Link>
          <Link href="/user/wishlist">
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
                display={wishlistItems.length > 0 ? "flex" : "none"}
                borderRadius="9999px"
                bgColor="tertiary"
                color="black"
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
                {wishlistItems.length}
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
