import Head from "next/head";

import { useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";

//Chakra UI
import {
  Container,
  Card,
  CardBody,
  Image,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Text,
  Box,
  Stack,
  Skeleton,
} from "@chakra-ui/react";

//Custom Components
import PageWrapper from "@/common/components/UI/PageWrapper";
import CustomText from "@/common/components/UI/CustomText";
import CustomButton from "@/common/components/UI/CustomButton";
import useGetShipping from "@/hooks/useGetShipping";
import { useEffect } from "react";

const Checkout = () => {
  const { cartItems, total } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.user);
  const { shipping, loading, error } = useGetShipping(user.pk!);

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

  return (
    <>
      <Head>
        <title>Checkout | Briskbuy</title>
      </Head>
      <PageWrapper>
        <Flex justifyContent="space-between" gap={2}>
          <Container maxW="4xl" bgColor="quaternary" my={8} p={8} rounded="md">
            <CustomButton
              variant="border"
              text="Back to Cart"
              route="cart"
              mb={6}
            />
            <CustomText variant="heading" text="Order Summary" mb={6} />
            <Container
              maxW="4xl"
              bgColor="quaternary"
              my={8}
              p={8}
              rounded="md"
            >
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
                                    />
                                  </CardBody>
                                </Card>
                              </Th>
                              <Td>{item.name}</Td>
                              <Td>{item.price.toLocaleString("en-IN")}</Td>
                              <Td>
                                <Flex justifyContent="space-around">
                                  <Text alignSelf="center">
                                    {item.quantity}
                                  </Text>
                                </Flex>
                              </Td>
                              <Td>
                                {(item.quantity * item.price).toLocaleString(
                                  "en-IN"
                                )}
                              </Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </>
              ) : (
                <CustomText
                  variant="subheading"
                  text="Your cart is empty!"
                  textAlign="center"
                />
              )}
              <CustomText
                variant="subheading"
                textAlign="right"
                text={`Total: ${total.toLocaleString("en-IN")}`}
              />
            </Container>
          </Container>
          <Container
            bgColor="quaternary"
            my={8}
            p={8}
            rounded="md"
            height="max-content"
          >
            <CustomText variant="subheading" text="Shipping Information" />
            <Stack mt={8}>
              {loading ? (
                <>
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                </>
              ) : error ? (
                <CustomText variant="paragraph" text="An error occured" />
              ) : (
                shipping.map((ship) => (
                  <Box key={ship.id} bg="gray.200" p={4} rounded="lg">
                    <CustomText
                      variant="paragraph"
                      text={`Street Address: ${ship.street_address}`}
                    />
                    <CustomText
                      variant="paragraph"
                      text={`City: ${ship.city}`}
                    />
                    <CustomText
                      variant="paragraph"
                      text={`State: ${ship.state}`}
                    />
                    <CustomText
                      variant="paragraph"
                      text={`Postal Code: ${ship.postal_code}`}
                    />
                  </Box>
                ))
              )}
            </Stack>
          </Container>
        </Flex>
      </PageWrapper>
    </>
  );
};

export default Checkout;
