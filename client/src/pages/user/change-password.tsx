import Head from "next/head";
import {
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import PageWrapper from "@/common/components/UI/PageWrapper";
import CustomText from "@/common/components/UI/CustomText";
import CustomButton from "@/common/components/UI/CustomButton";

const changePassword = () => {
  return (
    <>
      <Head>
        <title>Change Password | BriskBuy</title>
      </Head>
      <PageWrapper m={8} maxW="3xl" mx="auto">
        <Box background="quaternary" p={4} borderRadius="md">
          <CustomText variant="heading" text="Change Password" ml={5} />
          <Table variant="simple" size="md" mt={4}>
            <Tbody>
              <Tr>
                <Td>Old Password</Td>
                <Td>
                  <Input
                    type="password"
                    borderColor="gray.300"
                    bg="white"
                    name="old_password"
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>New Password</Td>
                <Td>
                  <Input type="password" borderColor="gray.300" bg="white" />
                </Td>
              </Tr>
              <Tr>
                <Td>Confirm Password</Td>
                <Td>
                  <Input type="password" borderColor="gray.300" bg="white" />
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Flex justifyContent="center">
            <CustomButton variant="solid" text="Change Password" mt={4} />
          </Flex>
        </Box>
      </PageWrapper>
    </>
  );
};

export default changePassword;
