import React, { useState } from "react";
import Head from "next/head";

//Chakra Components
import { Flex, Box, Image, Skeleton } from "@chakra-ui/react";
// import { Card, CardBody, CardFooter } from "@chakra-ui/react";
// import { Divider, ButtonGroup, Stack } from "@chakra-ui/react";

//Custom Components
import PageWrapper from "@/common/components/UI/PageWrapper";
import CustomText from "@/common/components/UI/CustomText";
import CustomButton from "@/common/components/UI/CustomButton";
import HeroCarousel from "@/common/components/UI/Carousel/HeroCarousel";
import LandingCarousel from "@/common/components/UI/Carousel/LandingCarousel";

//Miscellaneous Imports
import { home } from "@/common/typography/home";
import useGetProducts from "@/hooks/useGetProducts";
import { RootState } from "@/common/redux/store";
// import { useSelector } from "react-redux";

function Home() {
  const [page, setPage] = useState(1);
  const { loading, products, hasMore } = useGetProducts(page);
  const heroCarouselProducts = products?.slice(0, 5);

  // const { user } = useSelector((state: RootState) => state.user);

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  return (
    <>
      <Head>
        <title>Home | Briskbuy</title>
      </Head>
      <PageWrapper>
        <LandingCarousel />
        <Flex justifyContent="space-evenly" m={8} wrap="wrap">
          <Box maxWidth="45%" ml={4} alignItems="center">
            <CustomText
              variant="largeHeading"
              text={home.heading}
              fontSize="5xl"
              lineHeight="60px"
            />
            <CustomText
              variant="heading"
              text={home.subHeading}
              fontSize="3xl"
              marginTop="20px"
              lineHeight="40px"
              fontWeight="medium"
            />
            <Flex my={6} gap={6}>
              <CustomButton variant="solid" text="Shop Now" w="max-content" />
              <CustomButton
                variant="border"
                text="View Categories"
                w="max-content"
                route="/categories"
              />
            </Flex>
          </Box>
          <Flex
            width="50%"
            justifyContent="center"
            alignItems="right"
            direction="column"
          >
            <CustomText
              variant="heading"
              text={home.carouselHeading}
              textAlign="center"
            />
            {!loading && products && (
              <HeroCarousel products={heroCarouselProducts} />
            )}
            {loading && (
              <Box display="flex" flexDirection="column" alignItems="center">
                <Skeleton height="400px" width="400px" borderRadius="lg" />
              </Box>
            )}
          </Flex>
        </Flex>
      </PageWrapper>
    </>
  );
}

export default Home;
