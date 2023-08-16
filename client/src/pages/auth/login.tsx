import Head from "next/head";
import { useState } from "react";

// Chakra UI
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Divider,
  AbsoluteCenter,
  useToast,
} from "@chakra-ui/react";

// Custom Components
import PageWrapper from "@/common/components/UI/PageWrapper";
import CustomButton from "@/common/components/UI/CustomButton";
import CustomText from "@/common/components/UI/CustomText";
import CustomLink from "@/common/components/UI/CustomLink";

//Misc Imports
import { BsGoogle, BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();

  const handleLogin = () => {
    toast({
      position: "top",
      status: "info",
      title: "Logging you in...",
      duration: 3000,
    });
    if (!password) {
      toast({
        position: "top",
        status: "error",
        title: "Password Missing",
        description: "Please enter a password.",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Briskbuy | Login</title>
      </Head>
      <PageWrapper
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor="quaternary"
      >
        <Flex
          direction="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <CustomText variant="heading" text="Welcome Back!" />
          <CustomText
            variant="paragraph"
            text="We are happy to see you"
            mt={-1}
          />
          <Box
            bgColor="white"
            rounded="lg"
            border="2px solid grey"
            p={6}
            mt={8}
            boxShadow="base"
            maxHeight="700px"
            maxWidth="600px"
            width="400px"
          >
            <FormControl id="email" mb={3}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                bgColor="white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" mb={3}>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <CustomLink
              url="/auth/forgot-password"
              link="Forgot Password?"
              textAlign="right"
            />
            <Flex justifyContent="center">
              <CustomButton
                width="100%"
                variant="solid"
                colorScheme="primary"
                onClick={handleLogin}
                text="Login"
                mt={4}
                py={4}
              />
            </Flex>
            <Box position="relative" padding="8" px={0}>
              <Divider colorScheme="black" opacity={1} />
              <AbsoluteCenter bg="white" px="4">
                OR
              </AbsoluteCenter>
            </Box>
            <CustomButton
              icon={<BsGoogle />}
              width="100%"
              variant="border-icon"
              colorScheme="primary"
              text="Login with Google"
              onClick={() => {
                toast({
                  position: "top",
                  status: "info",
                  title: "Redirecting to Google..",
                  duration: 1500,
                });
              }}
            />
            <CustomLink
              url="/auth/signup"
              link="Sign up for a new account"
              mt={8}
              textAlign="center"
            />
          </Box>
        </Flex>
      </PageWrapper>
    </>
  );
};

export default Login;
