import Head from "next/head";

import { useDispatch, useSelector } from "react-redux";
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
} from "@chakra-ui/react";

//Custom Components
import PageWrapper from "@/common/components/UI/PageWrapper";
import CustomText from "@/common/components/UI/CustomText";
import CustomButton from "@/common/components/UI/CustomButton";

const Checkout = () => {
  const { cartItems, total } = useSelector((state: RootState) => state.cart);

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
                              <Td>{item.price}</Td>
                              <Td>
                                <Flex justifyContent="space-around">
                                  <Text alignSelf="center">
                                    {item.quantity}
                                  </Text>
                                </Flex>
                              </Td>
                              <Td>{item.quantity * item.price}</Td>
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
          </Container>
        </Flex>
      </PageWrapper>
    </>
  );
};

export default Checkout;
