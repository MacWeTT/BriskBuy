import Image from "next/image";
import sonyA7iiiImg from "../../assets/sonya7iii.jpg";

//Chakra UI
import { Flex, Box } from "@chakra-ui/react";

//Custom Components
import CustomText from "../components/UI/CustomText";

const LandingSlide3 = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      position="relative"
      maxH="30rem"
    >
      <Image src={sonyA7iiiImg} alt="Sony A7 iii" objectFit="contain" />
      <Box maxW="35rem" position="absolute" top="6%" left="2%">
        <CustomText
          // textAlign="right"
          variant="heading"
          textShadow="0 0 20px black"
          text="Discover True Photography: Sony Alpha 7 III Unveiled"
          color="white"
          zIndex={10}
        />
        <CustomText
          // textAlign="right"
          variant="subheading"
          textShadow="0 0 20px black"
          text="Capture every moment with stunning clarity using the Sony Alpha 7 III."
          color="white"
          zIndex={10}
        />
      </Box>
    </Flex>
  );
};

export default LandingSlide3;
