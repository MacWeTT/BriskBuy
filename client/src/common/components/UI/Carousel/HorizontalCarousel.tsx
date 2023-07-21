import React, {
  useState,
  // useEffect, useRef
} from "react";
import Router from "next/router";

//UI Components
import { Box, Button, Image } from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/react";
import { GrNext, GrPrevious } from "react-icons/gr";

//Miscellaneous Imports
import { Product } from "@/common/types/product";

interface HorizontalCarouselProps {
  products: Product[];
  //   showMore: Function;
}

const HorizontalCarousel: React.FC<HorizontalCarouselProps> = ({
  products,
  //   showMore,
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

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleRouting = (slug: string) => {
    Router.push(`/products/${slug}`);
  };

  //   const [lastCardVisible, setLastCardVisible] = useState(false);
  //   const lastCardRef = useRef<HTMLDivElement>(null);

  //   useEffect(() => {
  //     const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  //       entries.forEach((entry) => {
  //         if (entry.target === lastCardRef.current) {
  //           setLastCardVisible(entry.isIntersecting);
  //         }
  //       });
  //     };

  //     const observer = new IntersectionObserver(handleIntersection, {
  //       root: null,
  //       rootMargin: "0px",
  //       threshold: 0.9,
  //     });

  //     if (lastCardRef.current) {
  //       observer.observe(lastCardRef.current);
  //     }

  //     return () => {
  //       if (lastCardRef.current) {
  //         console.log("visible");
  //         observer.unobserve(lastCardRef.current);
  //       }
  //     };
  //   }, [products]);

  //   useEffect(() => {
  //     if (lastCardVisible) {
  //       showMore();
  //     }
  //   }, [lastCardVisible]);

  return (
    <Box
      position="relative"
      width="100%"
      height="300px"
      overflow="hidden"
      backgroundColor="quaternary"
    >
      {products.map((image, index) => (
        <Card
          key={index}
          maxW="sm"
          borderRadius="lg"
          my={8}
          mx={4}
          position="absolute"
          transition="transform 0.5s ease-in-out"
          transform={`translateX(${110 * (index - currentIndex)}%)`}
          onClick={() => handleRouting(products[index].slug)}
        >
          <CardBody>
            <Image
              src={`${backendURL}${image.image}`}
              alt={image.name}
              width="200px"
              height="200px"
              objectFit="contain"
              borderRadius="lg"
            />
          </CardBody>
        </Card>
      ))}
      <Button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        fontSize="20px"
        margin={4}
        p={0}
        position="absolute"
        left="0"
        top="50%"
        transform="translateY(-75%)"
        bg="quaternary"
      >
        <GrPrevious />
      </Button>
      <Button
        onClick={handleNext}
        disabled={currentIndex === products.length - 1}
        margin={4}
        p={0}
        bg="quaternary"
        fontSize="20px"
        position="absolute"
        right="0"
        top="50%"
        transform="translateY(-75%)"
      >
        <GrNext />
      </Button>
    </Box>
  );
};

export default HorizontalCarousel;
