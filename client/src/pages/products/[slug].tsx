import { useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

//UI Components
import { Flex, Box, Image, Skeleton, Card, CardBody } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import CustomText from "@/common/components/UI/CustomText";
import CustomButton from "@/common/components/UI/CustomButton";
import PageWrapper from "@/common/components/UI/PageWrapper";
import HorizontalCarousel from "@/common/components/UI/Carousel/HorizontalCarousel";

//Imports
import axios from "axios";
import { Product } from "@/common/types/product";
import useGetProducts from "@/hooks/useGetProducts";

async function fetchProductData(slug: string) {
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  console.log(backendURL);
  try {
    const response = await axios.get(`${backendURL}/api/products/`, {
      params: { query: slug },
    });
    // console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
interface ProductDetailsPageProps {
  product: Product;
}
const ProductDetailsPage = ({ product }: ProductDetailsPageProps) => {
  const router = useRouter();
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [page, setPage] = useState(1);
  const { loading, products, hasMore } = useGetProducts(page);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <PageWrapper>
        <Flex justifyContent="space-between" wrap="wrap" m={8}>
          <Flex direction="row">
            <Card w={20} h={20} my={8}>
              <CardBody p={1}>
                <Image
                  src={`${backendURL}${product.image}`}
                  alt={product.name}
                />
              </CardBody>
            </Card>
            <Image
              src={`${backendURL}${product.image}`}
              alt={product.name}
              width="600px"
              height="600px"
            />
          </Flex>
          <Box>
            <CustomText variant="heading" text={product.name} />
            <Divider />
            <CustomText
              variant="subheading"
              color="tertiary"
              text={`₹${product.price.toLocaleString("en-IN")}`}
            />
            <CustomText variant="paragraph" text="Inclusive of all taxes." />
            <Flex gap={6} mt={8}>
              <CustomButton variant="solid" text="Add to Cart" />
              <CustomButton variant="border" text="Buy Now" />
            </Flex>
          </Box>
        </Flex>
        <Divider />
        <CustomText variant="heading" text="Related Products" m={8} />
        <HorizontalCarousel
          products={products}
          hasMore={hasMore}
          setPage={setPage}
        />
      </PageWrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params || {};

  try {
    if (!slug) {
      return {
        notFound: true,
      };
    }

    const product = await fetchProductData(slug as string);
    console.log(product);
    if (!product) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default ProductDetailsPage;
