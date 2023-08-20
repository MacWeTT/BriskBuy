import Head from "next/head";
import { useState } from "react";

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
} from "@chakra-ui/react";

//Custom Components
import PageWrapper from "@/common/components/UI/PageWrapper";
import CustomButton from "@/common/components/UI/CustomButton";
import CustomText from "@/common/components/UI/CustomText";

const Cart = () => {
  const [items, setItems] = useState(3);
  const [price, setPrice] = useState(40);
  return (
    <>
      <Head>
        <title>Cart | Briskbuy</title>
      </Head>
      <PageWrapper>
        <Container maxW="4xl" bgColor="quaternary" mt={8} p={8} rounded="md">
          <CustomButton
            variant="border"
            text="Continue Shopping"
            mb={6}
            route="/"
          />
          <CustomText variant="heading" text="Your Cart" />
          <Flex justifyContent="space-between" alignItems="flex-end">
            <CustomText variant="subheading" text={`Items : ${items}`} />
            <CustomText variant="subheading" text={`Price : $${price}`} />
            <CustomButton
              variant="solid"
              text="Proceed to Checkout"
              route="checkout"
            />
          </Flex>
        </Container>
        <Container maxW="4xl" bgColor="quaternary" my={8} p={8} rounded="md">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Item</Th>
                  <Th>Price</Th>
                  <Th>Quantity</Th>
                  <Th>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Th>
                    <Card w={20} h={20} my={8}>
                      <CardBody p={1}>
                        <Image alt="product" />
                      </CardBody>
                    </Card>
                  </Th>
                  <Th>iPhone 14</Th>
                  <Th>68999</Th>
                  <Th>1</Th>
                  <Th>68999</Th>
                </Tr>
                <Tr>
                  <Th>
                    <Card w={20} h={20} my={8}>
                      <CardBody p={1}>
                        <Image alt="product" />
                      </CardBody>
                    </Card>
                  </Th>
                  <Th>iPhone 14</Th>
                  <Th>68999</Th>
                  <Th>1</Th>
                  <Th>68999</Th>
                </Tr>
                <Tr>
                  <Th>
                    <Card w={20} h={20} my={8}>
                      <CardBody p={1}>
                        <Image alt="product" />
                      </CardBody>
                    </Card>
                  </Th>
                  <Th>iPhone 14</Th>
                  <Th>68999</Th>
                  <Th>1</Th>
                  <Th>68999</Th>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Flex justifyContent="flex-end"></Flex>
        </Container>
      </PageWrapper>
    </>
  );
};

export default Cart;
