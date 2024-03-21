import { useState, useEffect } from "react";

//Chakra UI
import { Box, Flex, Button, Image } from "@chakra-ui/react";

//Custom Components
import CustomText from "@/common/components/UI/CustomText";

import { GrPrevious, GrNext } from "react-icons/gr";

//Slides
import LandingSlide1 from "@/common/templates/LandingSlide1";
import LandingSlide2 from "@/common/templates/LandingSlide2";
import LandingSlide3 from "@/common/templates/LandingSlide3";

const LandingCarousel = () => {
  const slides = [
    <LandingSlide1 key={1} />,
    <LandingSlide2 key={2} />,
    <LandingSlide3 key={3} />,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = 5000;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const handleAutoSlide = () => {
    handleNext();
  };

  useEffect(() => {
    const interval = setInterval(handleAutoSlide, slideInterval);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      bgColor="quaternary"
      height="30rem"
      position="relative"
      overflow="hidden"
      width="100%"
    >
      {slides.map((slide, index) => {
        return (
          <Flex
            justifyContent="center"
            alignItems="center"
            key={slide.key}
            position="absolute"
            cursor="pointer"
            top="0"
            left="0"
            width="100%"
            height="100%"
            transition="transform 0.5s ease-in-out"
            transform={`translateX(${100 * (index - currentIndex)}%)`}
          >
            {slide}
          </Flex>
        );
      })}
      <Button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        fontSize="20px"
        p={0}
        position="absolute"
        top="50%"
        left="2%"
        bg="white"
        opacity={0.7}
        transform="translateY(-50%)"
      >
        <GrPrevious />
      </Button>
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="center"
        mt={2}
        position="absolute"
        bottom="5%"
        left="50%"
        transform="translateX(-50%)"
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            w="10px"
            h="10px"
            bg={index === currentIndex ? "gray.500" : "gray.100"}
            borderRadius="full"
            mx={1}
            boxShadow="0 0 10px black"
            onClick={() => setCurrentIndex(index)}
            cursor="pointer"
          />
        ))}
      </Flex>
      <Button
        onClick={handleNext}
        disabled={currentIndex === slides.length - 1}
        fontSize="20px"
        p={0}
        position="absolute"
        top="50%"
        right="2%"
        bg="white"
        opacity={0.7}
        transform="translateY(-50%)"
      >
        <GrNext />
      </Button>
    </Box>
  );
};

export default LandingCarousel;

// <Flex direction="row" alignItems="center" justifyContent="space-evenly">
//   <Button
//     onClick={handlePrev}
//     disabled={currentIndex === 0}
//     fontSize="20px"
//     margin={4}
//     p={0}
//     bg="transparent"
//   >
//     <GrPrevious />
//   </Button>
//   <Flex direction="row" alignItems="center" justifyContent="center" mt={2}>
//     {slides.map((_, index) => (
//       <Box
//         key={index}
//         w="10px"
//         h="10px"
//         bg={index === currentIndex ? "gray.500" : "gray.200"}
//         borderRadius="full"
//         mx={1}
//         onClick={() => setCurrentIndex(index)}
//         cursor="pointer"
//       />
//     ))}
//   </Flex>
//   <Button
//     onClick={handleNext}
//     disabled={currentIndex === products.length - 1}
//     margin={4}
//     p={0}
//     bg="transparent"
//     fontSize="20px"
//   >
//     <GrNext />
//   </Button>
// </Flex>;
