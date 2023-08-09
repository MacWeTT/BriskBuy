import Head from "next/head";

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
} from "@chakra-ui/react";

//Custom Components
import PageWrapper from "@/common/components/UI/PageWrapper";
import CustomText from "@/common/components/UI/CustomText";
import CustomButton from "@/common/components/UI/CustomButton";

const Checkout = () => {
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
