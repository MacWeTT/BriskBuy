import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import { useChangePasswordMutation } from "@/common/redux/api/authAPI";

// Chakra UI
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
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import PageWrapper from "@/common/components/UI/PageWrapper";
import CustomText from "@/common/components/UI/CustomText";
import CustomButton from "@/common/components/UI/CustomButton";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const ChangePassword = () => {
  const toast = useToast();
  const router = useRouter();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      console.log(formData);
      const response = await changePassword(formData).unwrap();
      console.log(response);
      toast({
        position: "top",
        status: "success",
        title: "Password changed successfully!",
        description: "Redirecting to your profile...",
        duration: 1500,
        isClosable: true,
      });
      setTimeout(() => {
        router.push("/user/edit-profile");
      }, 1500);
    } catch (err: any) {
      toast({
        position: "top",
        status: "error",
        title: "Error changing password",
        description: "Please try again later.",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
                    onChange={(e) =>
                      setFormData({ ...formData, old_password: e.target.value })
                    }
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>New Password</Td>
                <Td>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      borderColor="gray.300"
                      bg="white"
                      pr="3.5rem"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          new_password: e.target.value,
                        })
                      }
                    />
                    <InputRightElement width="3.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Flex justifyContent="center">
            <CustomButton
              variant="solid"
              text="Change Password"
              mt={4}
              isLoading={isLoading}
              onClick={handleSubmit}
            />
          </Flex>
        </Box>
      </PageWrapper>
    </>
  );
};

export default ChangePassword;
