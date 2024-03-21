import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

//Redux
import useGetOrders from "@/hooks/useGetOrders";

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
} from "@chakra-ui/react";

//Custom Components
import PageWrapper from "@/common/components/UI/PageWrapper";
import CustomButton from "@/common/components/UI/CustomButton";
import CustomText from "@/common/components/UI/CustomText";

//React-Icons
import { BiSolidChevronRight, BiSolidChevronLeft } from "react-icons/bi";

const Orders = () => {
  const { orders } = useGetOrders();
  const router = useRouter();

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  return (
    <>
      <Head>
        <title>Orders | Briskbuy</title>
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
          <CustomText variant="heading" text="Your Orders" />
        </Container>
        <Container maxW="4xl" bgColor="quaternary" my={8} p={8} rounded="md">
          {orders.length > 0 ? (
            <>
              {/* <TableContainer>
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
                    {orders.map((item) => {
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
                            <Flex justifyContent="space-around">
                              <Text alignSelf="center">{item.quantity}</Text>
                              <Flex
                                direction="column"
                                gap={1}
                                fontSize="24px"
                                _hover={{
                                  cursor: "pointer",
                                }}
                              ></Flex>
                            </Flex>
                          </Td>
                          <Td>{`₹${(item.quantity * item.price).toLocaleString(
                            "en-IN"
                          )}`}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer> */}
            </>
          ) : (
            <CustomText
              variant="subheading"
              text="Your have no orders!"
              textAlign="center"
            />
          )}
        </Container>
      </PageWrapper>
    </>
  );
};

export default Orders;
