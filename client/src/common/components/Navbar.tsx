import React, { useState, ChangeEvent, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";
import { logout } from "../redux/reducers/userSlice";

//UI Components
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  Portal,
} from "@chakra-ui/react";
import { Flex, Box, Input } from "@chakra-ui/react";
import { InputGroup, InputRightElement } from "@chakra-ui/react";
import CustomText from "./UI/CustomText";
import CustomLink from "./UI/CustomLink";
import CustomButton from "./UI/CustomButton";
import CategoryNav from "./CategoryNav";

//React-Icons
import { BiShoppingBag, BiChevronDown, BiHeart } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
  const { user, isLoggedIn } = useSelector((state: RootState) => state.user);
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { wishlistItems } = useSelector((state: RootState) => state.wishlist);

  const router = useRouter();
  const dispatch = useDispatch();

  const userRef = useRef<HTMLDivElement | null>(null);
  const [searchInput, setSearchInput] = useState("");

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
          <Popover trigger="hover" placement="bottom" isLazy>
            <PopoverTrigger>
              <Flex justifyContent="center" alignItems="center" ref={userRef}>
                <CustomText variant="paragraph" text={user.first_name} />
                <Flex fontSize="24">
                  <BiChevronDown />
                </Flex>
              </Flex>
            </PopoverTrigger>
            <Portal>
              <PopoverContent width="max-content">
                <PopoverArrow />
                <PopoverHeader textAlign="center">Your Account</PopoverHeader>
                {isLoggedIn ? (
                  <PopoverBody>
                    <Link href="/user/profile">
                      <Flex
                        position="relative"
                        justifyContent="space-between"
                        alignItems="center"
                        fontSize="28"
                        my={2}
                      >
                        <BsPerson />
                        <CustomText
                          variant="paragraph"
                          text="Your Profile"
                          px="1"
                        />
                      </Flex>
                    </Link>
                    <Link href="/user/orders">
                      <Flex
                        position="relative"
                        justifyContent="space-between"
                        alignItems="center"
                        fontSize="28"
                        my={2}
                      >
                        <BiShoppingBag />
                        <CustomText
                          variant="paragraph"
                          text="Your Orders"
                          px="1"
                        />
                      </Flex>
                    </Link>
                    <CustomButton
                      variant="solid"
                      text="Logout"
                      onClick={() => {
                        setTimeout(() => {
                          dispatch(logout());
                          router.reload();
                        }, 1000);
                      }}
                      width="100%"
                      mt={4}
                    />
                  </PopoverBody>
                ) : (
                  <PopoverBody>
                    <CustomButton
                      variant="solid"
                      text="Login"
                      route="/auth/login"
                      width="100%"
                      mt={4}
                      mb={2}
                    />
                  </PopoverBody>
                )}
              </PopoverContent>
            </Portal>
          </Popover>
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
              <BiHeart />
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
