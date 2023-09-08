import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { useLoginUserMutation } from "@/common/redux/api/authAPI";
import { setUser } from "@/common/redux/reducers/userSlice";
import { RootState } from "@/common/redux/store";

//GoogleLogin
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

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
  //Check if user is already logged in
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (isLoggedIn) router.push("/");
  });

  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginUserMutation();

  const handleLogin = async () => {
    toast({
      position: "top",
      status: "info",
      title: "Logging you in...",
      duration: 800,
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
    } else {
      try {
        const response = await login({ email, password }).unwrap();
        console.log(response);
        toast({
          position: "top",
          status: "success",
          title: "Login Successful",
          description: "You have been logged in successfully. Redirecting...",
          duration: 1500,
          isClosable: true,
        });
        setTimeout(() => {
          dispatch(setUser(response));
          router.push("/");
        }, 1500);
      } catch (error: any) {
        toast({
          position: "top",
          status: "error",
          title: "Login Failed",
          description: `${error.error}`,
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      axios({
        method: "POST",
        url: `${backendURL}/users/google/login`,
        data: {
          code: codeResponse,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <>
      <Head>
        <title>Login | Briskbuy</title>
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
                onClick={handleLogin}
                isLoading={isLoading}
                colorScheme="primary"
                variant="solid"
                text="Login"
                width="100%"
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
                handleGoogleLogin();
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

// const handleGoogleLogin = useGoogleLogin({
//   flow: "auth-code",
//   onSuccess: async (codeResponse) => {
//     console.log("Authorization Code:", codeResponse.code);

//     try {
//       const formData = new URLSearchParams();
//       formData.append("code", codeResponse.code);
//       const response = await axios.post(
//         `${backendURL}/users/auth/google/`,
//         formData.toString(),
//         {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         }
//       );

//       console.log("Backend Response:", response.data);
//     } catch (error) {
//       console.error("Backend Error:", error);
//     }
//   },
//   onError: (errorResponse) =>
//     console.log("Google Login Error:", errorResponse),
// });
