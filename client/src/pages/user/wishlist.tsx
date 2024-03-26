import Head from "next/head";
import { useRouter } from "next/router";
import { Product } from "@/common/types/product";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";
import { addItem } from "@/common/redux/reducers/cartSlice";

//Chakra UI
import {
  Box,
  Container,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Card,
  CardBody,
  Image,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";

//Custom Components
import PageWrapper from "@/common/components/UI/PageWrapper";
import CustomButton from "@/common/components/UI/CustomButton";
import CustomText from "@/common/components/UI/CustomText";

//React-Icons
import { BiSolidChevronLeft } from "react-icons/bi";
import {
  clearWishlist,
  removeItemFromWishlist,
} from "@/common/redux/reducers/wishlistSlice";
import { useAddToWishlistMutation } from "@/common/redux/api/productAPI";

const Wishlist = () => {
  const { wishlistItems, total } = useSelector(
    (state: RootState) => state.wishlist
  );

  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();

  const [addToWishlist] = useAddToWishlistMutation();

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleMoveToCart = async (item: Product) => {
    const response = await addToWishlist(item).unwrap();
    console.log(response);
    // dispatch(addItem(item));
    // dispatch(removeItemFromWishlist(item.id));
    // toast({
    //   position: "top",
    //   status: "success",
    //   title: "Item moved to cart.",
    //   duration: 900,
    // });
  };

  return (
    <>
      <Head>
        <title>Wishlist | Briskbuy</title>
      </Head>
      <PageWrapper>
        <Container maxW="4xl" bgColor="quaternary" mt={8} p={8} rounded="md">
          <CustomButton
            icon={<BiSolidChevronLeft />}
            variant="border-icon"
            text="Continue Shopping"
            mb={6}
            route="/"
          />
          <Flex justifyContent="space-between" alignItems="flex-end">
            <CustomText variant="heading" text="Your Wishlist" />
            <CustomText
              variant="subheading"
              text={`Items : ${wishlistItems.length}`}
            />
          </Flex>
        </Container>
        <Container maxW="4xl" bgColor="quaternary" my={8} p={8} rounded="md">
          {wishlistItems.length > 0 ? (
            <>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th></Th>
                      <Th>Product</Th>
                      <Th>Price</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {wishlistItems.map((item) => {
                      return (
                        <Tr key={item.id}>
                          <Th>
                            <Card w={20} h={20} my={8}>
                              <CardBody p={1}>
                                <Image
                                  alt={item.name}
                                  src={`${backendURL}${item.image}`}
                                  cursor="pointer"
                                  onClick={() =>
                                    router.push(`/products/${item.slug}`)
                                  }
                                />
                              </CardBody>
                            </Card>
                          </Th>
                          <Td>{item.name}</Td>
                          <Td>{`₹${item.price.toLocaleString("en-IN")}`}</Td>
                          <Td>
                            <Box className="flex justify-evenly items-center">
                              <Button
                                variant="solid"
                                colorScheme="teal"
                                onClick={() => {
                                  handleMoveToCart(item);
                                }}
                              >
                                Move To Cart
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={() => {
                                  handleMoveToCart(item);
                                }}
                              >
                                Remove
                              </Button>
                            </Box>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
              <Button
                colorScheme="red"
                onClick={() => {
                  dispatch(clearWishlist());
                }}
              >
                <Text>Clear Wishlist</Text>
              </Button>
            </>
          ) : (
            <CustomText
              variant="subheading"
              text="Your wishlist is empty!"
              textAlign="center"
            />
          )}
        </Container>
      </PageWrapper>
    </>
  );
};

export default Wishlist;
