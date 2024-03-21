import Head from "next/head";

import useGetShipping from "@/hooks/useGetShipping";
import { useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";
import { useState, useEffect } from "react";

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
  Stack,
  Skeleton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

//Custom Components
import PageWrapper from "@/common/components/UI/PageWrapper";
import CustomText from "@/common/components/UI/CustomText";
import CustomButton from "@/common/components/UI/CustomButton";
import ShippingAddressBox from "@/common/components/ShippingAddressBox";
import { useAddShippingMutation } from "@/common/redux/api/productAPI";
import { ShippingAddress } from "@/common/types/user";

const Checkout = () => {
  const { cartItems, total } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.user);
  const { shipping, loading, error } = useGetShipping(user.pk!);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

  const [addShipping, { isLoading }] = useAddShippingMutation();
  const [newShippingAddress, setNewShippingAddress] = useState(
    {} as ShippingAddress
  );
  const handleShippingSave = async () => {
    toast({
      position: "top",
      status: "info",
      title: "Adding Shipping Address...",
      duration: 800,
    });

    try {
      const response = await addShipping(newShippingAddress).unwrap();
      if (response) {
        toast({
          position: "top",
          status: "success",
          title: "Shipping Address Added",
          description: "Your shipping address has been added successfully.",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err: any) {
      toast({
        position: "top",
        status: "error",
        title: "An error occured",
        description: "Please try again later.",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
                  <ShippingAddressBox key={ship.id} ship={ship} />
                ))
              )}
              <CustomButton
                variant="border"
                text="Add New Address"
                onClick={onOpen}
              ></CustomButton>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Add new address</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>Street Address</FormLabel>
                      <Input placeholder="Your address here..." />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>City</FormLabel>
                      <Input placeholder="Your city" />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>State</FormLabel>
                      <Input placeholder="Your state" />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Postal Code</FormLabel>
                      <Input placeholder="Your postal code" />
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={handleShippingSave}
                      isLoading={isLoading}
                    >
                      Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Stack>
          </Container>
        </Flex>
      </PageWrapper>
    </>
  );
};

export default Checkout;
