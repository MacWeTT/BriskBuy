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

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password2, setPassword2] = useState("");
  const [showPassword2, setShowPassword2] = useState(false);
  const toast = useToast();

  const isPasswordValid = (password: string) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
      password
    );
    return (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasSpecialCharacter
    );
  };

  const handleSignup = () => {
    if (password !== password2) {
      toast({
        position: "top",
        status: "error",
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        duration: 3000,
        isClosable: true,
      });
    } else if (!isPasswordValid(password)) {
      toast({
        position: "top",
        status: "error",
        title: "Invalid Password",
        description:
          "Password must be at least 8 characters long,contain at least one uppercase and one lowercase letter, and one special character.",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        position: "top",
        status: "success",
        title: "Signing you up...",
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
          <CustomText variant="heading" text="Welcome To Briskbuy!" />
          <CustomText
            variant="paragraph"
            text="We are happy to have you"
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
                required
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
            <FormControl id="password2" mb={3}>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={showPassword2 ? "text" : "password"}
                  placeholder="Enter password"
                  onChange={(e) => setPassword2(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword2(!showPassword2)}
                  >
                    {showPassword2 ? <BsEyeFill /> : <BsEyeSlashFill />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Flex justifyContent="center">
              <CustomButton
                width="100%"
                variant="solid"
                colorScheme="primary"
                onClick={handleSignup}
                text="Sign Up"
                mt={4}
                py={4}
              />
            </Flex>
            <Box position="relative" padding="10" px={0}>
              <Divider />
              <AbsoluteCenter bg="white" px="4">
                OR
              </AbsoluteCenter>
            </Box>
            <CustomButton
              icon={<BsGoogle />}
              width="100%"
              variant="border-icon"
              colorScheme="primary"
              text="SignUp with Google"
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
              url="/auth/login"
              link="Already have an account ? Login"
              mt={8}
              textAlign="center"
            />
          </Box>
        </Flex>
      </PageWrapper>
    </>
  );
};

export default SignUp;
