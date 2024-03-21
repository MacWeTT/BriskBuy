import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { useEditUserProfileMutation } from "@/common/redux/api/authAPI";
import { RootState } from "@/common/redux/store";
import { updateUser } from "@/common/redux/reducers/userSlice";
import { User } from "@/common/types/user";

// Chakra UI
import {
  Box,
  Button,
  Flex,
  Stack,
  useToast,
  Table,
  Tbody,
  Tr,
  Td,
  Input,
} from "@chakra-ui/react";
import { MdVerified } from "react-icons/md";

// Custom components
import PageWrapper from "@/common/components/UI/PageWrapper";
import CustomText from "@/common/components/UI/CustomText";
import CustomButton from "@/common/components/UI/CustomButton";

const EditProfile = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const router = useRouter();

  const { user } = useSelector((state: RootState) => state.user);
  const [edit, { isLoading }] = useEditUserProfileMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [info, setInfo] = useState<User>(user);

  const handleSaveClick = async () => {
    toast({
      position: "top",
      status: "info",
      title: "Editing your profile...",
      duration: 800,
    });
    try {
      const response = await edit(info).unwrap();
      if (response.status === 200) {
        toast({
          position: "top",
          status: "success",
          title: "Profile edited successfully!",
          duration: 800,
        });
      }
      dispatch(updateUser(response));
      setIsEditing(false);
    } catch (error: any) {
      toast({
        position: "top",
        status: "error",
        title: "Error editing profile.",
        description: "Please try again.",
        duration: 800,
      });
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Profile | BriskBuy</title>
      </Head>
      <PageWrapper m={8} maxW="3xl" mx="auto">
        <Box background="quaternary" p={4} borderRadius="md">
          <CustomText variant="heading" text="Your profile" ml={4} mb={8} />
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>Username</Td>
                {isEditing ? (
                  <Td>
                    <Input
                      value={info.username}
                      onChange={(e) =>
                        setInfo({ ...info, username: e.target.value })
                      }
                    />
                  </Td>
                ) : (
                  <Td>{info.username}</Td>
                )}
              </Tr>
              <Tr>
                <Td>Name</Td>
                {isEditing ? (
                  <Td>
                    <Input
                      value={info.name}
                      onChange={(e) =>
                        setInfo({ ...info, name: e.target.value })
                      }
                    />
                  </Td>
                ) : (
                  <Td>{info.name}</Td>
                )}
              </Tr>
              <Tr>
                <Td>Email</Td>
                {isEditing ? (
                  <Td>
                    <Input
                      value={info.email}
                      onChange={(e) =>
                        setInfo({ ...info, email: e.target.value })
                      }
                    />
                  </Td>
                ) : (
                  <Td>
                    <Flex gap={4} alignItems="center">
                      {info.email}
                      {info.verified && <MdVerified />}
                    </Flex>
                  </Td>
                )}
              </Tr>
            </Tbody>
          </Table>
          <Flex justifyContent="center" gap={4} mt={4} justify="flex-end">
            {isEditing ? (
              <Button
                colorScheme="green"
                onClick={handleSaveClick}
                isLoading={isLoading}
              >
                Save Profile
              </Button>
            ) : (
              <CustomButton
                variant="solid"
                text="Edit Profile"
                onClick={() => setIsEditing(!isEditing)}
              />
            )}
            <Button
              colorScheme="yellow"
              disabled={isEditing === true}
              onClick={() => router.push("/user/change-password")}
            >
              Change Password
            </Button>
          </Flex>
        </Box>
      </PageWrapper>
    </>
  );
};

export default EditProfile;
