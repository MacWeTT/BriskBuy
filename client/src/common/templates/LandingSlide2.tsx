import Image from "next/image";
import iPhoneImg from "../../assets/iphone14pro.jpg";

//Chakra UI
import { Flex, Box } from "@chakra-ui/react";

//Custom Components
import CustomText from "../components/UI/CustomText";

const LandingSlide2 = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      position="relative"
      maxH="30rem"
    >
      <Image src={iPhoneImg} alt="iPhone14 Pro" objectFit="cover" />
      <Box maxW="30rem" position="absolute" top="10%" left="2%">
        <CustomText
          variant="heading"
          textShadow="0 0 10px white"
          text="Introducing iPhone 14 Pro: Beyond Imagination"
          color="black"
          zIndex={10}
        />
        <CustomText
          variant="subheading"
          textShadow="0 0 10px white"
          text="Explore the Dynamic Island: Your iPhone, Your Control Center."
          color="black"
          zIndex={10}
        />
      </Box>
    </Flex>
  );
};

export default LandingSlide2;
