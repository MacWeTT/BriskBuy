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
import HorizontalCarousel from "@/common/components/UI/Carousel/HorizontalCarousel";

//Miscellaneous Imports
import { home } from "@/common/typography/home";
import useGetProducts from "@/hooks/useGetProducts";

function Home() {
  const [page, setPage] = useState(1);
  const { loading, products, hasMore } = useGetProducts(page);
  const heroCarouselProducts = products?.slice(0, 5);

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  return (
    <>
      <Head>
        <title>Briskbuy | Home</title>
      </Head>
      <PageWrapper>
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
              fontWeight="medium"
              lineHeight="40px"
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
        {/* <Box mx={8} bgColor="quaternary" p={8}>
          {products && (
            <Flex justifyContent="space-around" flexWrap="wrap">
              {products?.map((product) => (
                <Box key={product.id}>
                  <Card maxW="sm" my={8}>
                    <CardBody>
                      <Image
                        src={`${backendURL}${product.image}`}
                        alt={product.image}
                        width="200px"
                        height="200px"
                        borderRadius="lg"
                      />
                      <Stack mt="6" spacing="3" textOverflow="ellipsis">
                        <CustomText
                          variant="heading"
                          lineHeight="10px"
                          fontSize="xl"
                          text={product.name}
                        />
                        <CustomText
                          variant="subheading"
                          textAlign="right"
                          color="blue.600"
                          fontSize="lg"
                          text={`₹${product.price.toLocaleString("en-IN")}`}
                        />
                      </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter display="flex" justifyContent="center">
                      <ButtonGroup spacing="2">
                        <CustomButton variant="solid" text="Add To cart" />
                        <CustomButton variant="border" text="Wishlist" />
                      </ButtonGroup>
                    </CardFooter>
                  </Card>
                </Box>
              ))}
            </Flex>
          )}
        </Box> */}
        <Box mx={8} bgColor="quaternary" p={8}>
          {products && (
            <Flex justifyContent="space-around" flexWrap="wrap">
              <HorizontalCarousel
                products={products}
                hasMore={hasMore}
                setPage={setPage}
              />
            </Flex>
          )}
        </Box>
      </PageWrapper>
    </>
  );
}

export default Home;
