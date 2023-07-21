import React, { useState, useEffect } from "react";
import Router from "next/router";

//UI Components
import {
  Box,
  Button,
  Flex,
  ChakraProps,
  Image,
  Skeleton,
} from "@chakra-ui/react";
import { GrNext, GrPrevious } from "react-icons/gr";
import CustomText from "../CustomText";

//Miscellaneous Imports
import { Product } from "@/common/types/product";

interface HeroCarouselProps {
  products: Product[];
  slideInterval?: number;
  props?: ChakraProps;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({
  products,
  slideInterval = 5000,
  ...props
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
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

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleRouting = (slug: string) => {
    Router.push(`/products/${slug}`);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" {...props}>
      <Box
        position="relative"
        width="400px"
        height="400px"
        overflow="hidden"
        borderRadius="lg"
        backgroundColor="quaternary"
      >
        {products.map((image, index) => (
          <Box
            position="absolute"
            key={index}
            onClick={() => handleRouting(image.slug)}
            transition="transform 0.5s ease-in-out"
            transform={`translateX(${100 * (index - currentIndex)}%)`}
          >
            <Image
              key={index}
              src={`${backendURL}${image.image}`}
              alt={image.name}
              width={400}
              height={400}
              objectFit="contain"
              mixBlendMode="multiply"
            />
            <Box position="absolute" bottom="0" width="100%">
              <Flex
                justifyContent="center"
                alignItems="center"
                backgroundColor="rgba(0,0,0,0.5)"
                color="quaternary"
                overflow="hidden"
              >
                <CustomText variant="subheading" text={image.name} />
              </Flex>
            </Box>
          </Box>
        ))}
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
          {products.map((_, index) => (
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
          disabled={currentIndex === products.length - 1}
          margin={4}
          p={0}
          bg="transparent"
          fontSize="20px"
        >
          <GrNext />
        </Button>
      </Flex>
    </Box>
  );
};

export default HeroCarousel;
