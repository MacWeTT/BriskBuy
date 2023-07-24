import React, { useState, useEffect, useRef } from "react";
import Router from "next/router";

//UI Components
import { Flex, Button, Divider, Image, Box } from "@chakra-ui/react";
import { Card, CardHeader, CardBody } from "@chakra-ui/react";
import { GrNext, GrPrevious } from "react-icons/gr";

//Miscellaneous Imports
import { Product } from "@/common/types/product";
import CustomText from "../CustomText";

interface HorizontalCarouselProps {
  products: Product[];
  hasMore: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const HorizontalCarousel: React.FC<HorizontalCarouselProps> = ({
  products,
  hasMore,
  setPage,
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

  const [lastCardVisible, setLastCardVisible] = useState(false);
  const lastCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.target === lastCardRef.current) {
          setLastCardVisible(entry.isIntersecting);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "120px",
      threshold: 0.9,
    });

    const currentRef = lastCardRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [products]);

  useEffect(() => {
    if (lastCardVisible && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [lastCardVisible, hasMore, setPage]);

  return (
    <Box
      gap={4}
      width="100%"
      height="450px"
      overflow="hidden"
      position="relative"
      backgroundColor="quaternary"
    >
      {products.map((image, index) => (
        <Card
          key={index}
          width="300px"
          height="375px"
          borderRadius="lg"
          my={8}
          mx={4}
          bgColor="quaternary"
          transition="transform 0.5s ease-in-out"
          boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
          transform={`translateX(-${100 * currentIndex}%)`}
          onClick={() => handleRouting(products[index].slug)}
          ref={index === products.length - 1 ? lastCardRef : null}
        >
          <CardHeader>
            <Image
              src={`${backendURL}${image.image}`}
              alt={image.name}
              width="200px"
              height="200px"
              objectFit="contain"
              mixBlendMode="multiply"
              borderRadius="lg"
            />
          </CardHeader>
          <Divider />
          <CardBody>
            <CustomText
              variant="paragraph"
              fontSize="2xl"
              text={image.name}
              overflowWrap="normal"
              lineHeight="25px"
              mb={2}
            />
            <CustomText
              variant="paragraph"
              text={`${image.price}`}
              color="tertiary"
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
