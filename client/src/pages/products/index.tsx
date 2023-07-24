import { GetServerSideProps } from "next";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { Product } from "@/common/types/product";

import axios from "axios";

async function fetchProductData(query: string) {
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  try {
    const response = await axios.get(`${backendURL}/api/products/`, {
      params: { query: query },
    });
    return response.data.results;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

interface ProductsPageProps {
  products: Product[];
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products }) => {
  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Search Results ({products.length})
      </Heading>
      <SimpleGrid columns={2} spacing={8}>
        {products.map((product) => (
          <Box key={product.id}>
            {/* Render product details here */}
            <p>{product.name}</p>
            <p>{product.description}</p>
            {/* Add more details as needed */}
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { query: searchQuery } = query;
  if (!searchQuery || Array.isArray(searchQuery)) {
    // Handle invalid query
    return {
      notFound: true,
    };
  }

  try {
    // Replace this with your actual API call function to fetch product data based on the search query
    const products = await fetchProductData(searchQuery as string);
    if (!products) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.log("Error fetching product data:", error);
    return {
      notFound: true,
    };
  }
};

export default ProductsPage;
