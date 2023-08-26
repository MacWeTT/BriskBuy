import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";
import {
  decrease,
  increase,
  clearCart,
} from "@/common/redux/reducers/cartSlice";

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
  Tfoot,
  Card,
  CardBody,
  Image,
  Text,
} from "@chakra-ui/react";

//Custom Components
import PageWrapper from "@/common/components/UI/PageWrapper";
import CustomButton from "@/common/components/UI/CustomButton";
import CustomText from "@/common/components/UI/CustomText";

//React-Icons
import { BiSolidChevronRight, BiSolidChevronLeft } from "react-icons/bi";
import { HiChevronUp, HiChevronDown } from "react-icons/hi";

const Cart = () => {
  const { cartItems, total } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const dispatch = useDispatch();
  const router = useRouter();

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  return (
    <>
      <Head>
        <title>Cart | Briskbuy</title>
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
          <CustomText variant="heading" text="Your Cart" />
          <Flex justifyContent="space-between" alignItems="flex-end">
            <CustomText
              variant="subheading"
              text={`Items : ${cartItems.length}`}
            />
            <CustomText
              variant="subheading"
              text={`Price : ₹${total.toLocaleString("en-IN")}`}
            />
            <CustomButton
              icon={<BiSolidChevronRight />}
              variant="solid-icon"
              text="Proceed to Checkout"
              route="checkout"
            />
          </Flex>
        </Container>
        <Container maxW="4xl" bgColor="quaternary" my={8} p={8} rounded="md">
          {cartItems.length > 0 ? (
            <>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th></Th>
                      <Th>Product</Th>
                      <Th>Price</Th>
                      <Th>Quantity</Th>
                      <Th>Total</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {cartItems.map((item) => {
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
                          <Td>{item.price}</Td>
                          <Td>
                            <Flex justifyContent="space-around">
                              <Text alignSelf="center">{item.quantity}</Text>
                              <Flex
                                direction="column"
                                gap={1}
                                fontSize="24px"
                                _hover={{
                                  cursor: "pointer",
                                }}
                              >
                                <HiChevronUp
                                  onClick={() => {
                                    dispatch(increase(item.id));
                                  }}
                                />
                                <HiChevronDown
                                  onClick={() => {
                                    dispatch(decrease(item.id));
                                  }}
                                />
                              </Flex>
                            </Flex>
                          </Td>
                          <Td>{item.quantity * item.price}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
              <Flex justifyContent="flex-end">
                <CustomButton
                  variant="solid"
                  colorScheme="red"
                  onClick={() => {
                    dispatch(clearCart());
                  }}
                  text="Clear Cart"
                />
              </Flex>
            </>
          ) : (
            <CustomText
              variant="subheading"
              text="Your cart is empty!"
              textAlign="center"
            />
          )}
        </Container>
      </PageWrapper>
    </>
  );
};

export default Cart;
