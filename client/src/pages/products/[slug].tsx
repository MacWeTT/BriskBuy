import Head from "next/head";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/common/redux/reducers/cartSlice";
import { addItemToWishlist } from "@/common/redux/reducers/wishlistSlice";
import { RootState } from "@/common/redux/store";

//UI Components
import {
  Flex,
  Box,
  Image,
  Skeleton,
  Card,
  CardBody,
  Container,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
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
  try {
    const response = await axios.get(`${backendURL}/api/products/`, {
      params: { query: slug },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

interface ProductDetailsPageProps {
  product: Product;
}

const ProductDetailsPage = ({ product }: ProductDetailsPageProps) => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch();

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [page, setPage] = useState(1);
  const { products, hasMore } = useGetProducts(page);
  const description = product.description.split("\r\n");

  const { cartItems } = useSelector((state: RootState) => state.cart);
  const [alreadyInCart, setAlreadyInCart] = useState(false);

  const { wishlistItems } = useSelector((state: RootState) => state.wishlist);
  const [alreadyInWishlist, setAlreadyInWishlist] = useState(false);

  useEffect(() => {
    if (cartItems.find((item) => item.id === product.id))
      setAlreadyInCart(true);
    if (wishlistItems.find((item) => item.id === product.id))
      setAlreadyInWishlist(true);
  }, [cartItems, wishlistItems, product]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Head>
        <title>{product.name} | BriskBuy</title>
      </Head>
      <PageWrapper>
        <Flex justifyContent="space-around" my={8} wrap="wrap">
          <Flex direction="row" mb={12}>
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
              ml={8}
              width="30rem"
              height="30rem"
            />
          </Flex>
          <Box mt={8}>
            <CustomText variant="heading" text={product.name} />
            <Divider />
            <CustomText
              variant="subheading"
              color="tertiary"
              text={`₹${product.price.toLocaleString("en-IN")}`}
            />
            <CustomText variant="paragraph" text="Inclusive of all taxes." />
            <Flex gap={6} my={4}>
              <CustomButton
                variant="solid"
                text={alreadyInCart ? "In Cart" : "Add to Cart"}
                onClick={() => {
                  if (alreadyInCart) {
                    toast({
                      position: "top",
                      status: "info",
                      title: "Item already in cart.",
                      duration: 900,
                    });
                    return;
                  }
                  dispatch(addItem(product));
                  setAlreadyInCart(true);
                  toast({
                    position: "top",
                    status: "success",
                    title: "Item added to cart !",
                    duration: 900,
                  });
                }}
              />
              <CustomButton
                variant="border"
                text={
                  alreadyInWishlist ? "Added To Wishlist" : "Add to Wishlist"
                }
                onClick={() => {
                  if (alreadyInWishlist) {
                    toast({
                      position: "top",
                      status: "info",
                      title: "Item already added to wishlist.",
                      duration: 900,
                    });
                    return;
                  }
                  dispatch(addItemToWishlist(product));
                  setAlreadyInWishlist(true);
                  toast({
                    position: "top",
                    status: "success",
                    title: "Item added to wishlist !",
                    duration: 900,
                  });
                }}
              />
            </Flex>
            <Divider />
            <CustomText variant="subheading" text="Description" my={2} />
            <UnorderedList>
              {description.map((item) => (
                <ListItem key={item}>{item}</ListItem>
              ))}
            </UnorderedList>
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
