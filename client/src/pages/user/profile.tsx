import Head from "next/head";
import { useRouter } from "next/router";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/common/redux/store";
import { logout } from "@/common/redux/reducers/userSlice";

//Chakra UI
import { Box, Button, Stack, useToast } from "@chakra-ui/react";

//Custom components
import PageWrapper from "@/common/components/UI/PageWrapper";
import CustomText from "@/common/components/UI/CustomText";
import CustomButton from "@/common/components/UI/CustomButton";

const Profile = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const router = useRouter();

  const { user } = useSelector((state: RootState) => state.user);
  return (
    <>
      <Head>
        <title>Profile | BriskBuy</title>
      </Head>
      <PageWrapper m={8} maxW="3xl" mx="auto">
        <Box background="quaternary" p={4} borderRadius="md">
          <CustomText variant="heading" text="Your profile" />
          <CustomText
            variant="subheading"
            text={`Username: ${user.username}`}
          />
          <CustomText
            variant="subheading"
            text={`First Name: ${user.first_name}`}
          />
          <CustomText
            variant="subheading"
            text={`Last Name: ${user.last_name}`}
          />
          <CustomText variant="subheading" text={`Email: ${user.email}`} />
          <Stack direction="row" spacing={4} mt={4} mb={4}>
            <CustomButton
              variant="solid"
              text="Edit Profile"
              onClick={() => {}}
            />
            <CustomButton
              variant="border"
              text="Change Password"
              onClick={() => {}}
            />
            <Button
              colorScheme="red"
              onClick={() => {
                toast({
                  title: "Logged out successfully.",
                  description: "Redirecting to home page....",
                  status: "warning",
                  duration: 1500,
                  position: "top",
                });
                setTimeout(() => {
                  dispatch(logout());
                  router.push("/");
                }, 1500);
              }}
            >
              Logout
            </Button>
          </Stack>
        </Box>
      </PageWrapper>
    </>
  );
};

export default Profile;
