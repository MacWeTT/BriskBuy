import Image from "next/image";
import acerImg from "../../assets/acernitro.jpg";

//Chakra UI
import { Flex, Box } from "@chakra-ui/react";

//Custom Components
import CustomText from "../components/UI/CustomText";

const LandingSlide1 = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      position="relative"
      maxH="30rem"
    >
      <Image src={acerImg} alt="Acer Nitro 5" objectFit="cover" />
      <Box maxW="25rem" position="absolute" top="10%" left="2%">
        <CustomText
          variant="heading"
          text="Experience Gaming Excellence with Acer Nitro 5"
          color="white"
          zIndex={10}
        />
        <CustomText
          variant="subheading"
          text="Precision-crafted for gaming enthusiasts and professionals alike."
          color="white"
          zIndex={10}
        />
      </Box>
    </Flex>
  );
};

export default LandingSlide1;
