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

  // const handleAutoSlide = () => {
  //   handleNext();
  // };

  // useEffect(() => {
  //   const interval = setInterval(handleAutoSlide, slideInterval);
  //   return () => clearInterval(interval);
  //   // eslint-disable-next-line
  // }, []);

  return (
    <>
      <Box
        mx={8}
        bgColor="quaternary"
        height="30rem"
        position="relative"
        overflow="hidden"
      >
        {slides.map((slide, index) => {
          return (
            <Flex
              justifyContent="center"
              alignItems="center"
              key={slide.key}
              position="absolute"
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
      </Box>
      <Flex direction="row" alignItems="center" justifyContent="space-evenly">
        <Button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          fontSize="20px"
          margin={4}
          p={0}
          bg="transparent"
        >
          <GrPrevious />
        </Button>
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="center"
          mt={2}
        >
          {slides.map((_, index) => (
            <Box
              key={index}
              w="10px"
              h="10px"
              bg={index === currentIndex ? "gray.500" : "gray.200"}
              borderRadius="full"
              mx={1}
              onClick={() => setCurrentIndex(index)}
              cursor="pointer"
            />
          ))}
        </Flex>
        <Button
          onClick={handleNext}
          disabled={currentIndex === slides.length - 1}
          margin={4}
          p={0}
          bg="transparent"
          fontSize="20px"
        >
          <GrNext />
        </Button>
      </Flex>
    </>
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
