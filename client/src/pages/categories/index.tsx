import React from "react";
import Head from "next/head";

//Chakra UI
import { Box } from "@chakra-ui/react";

//Custom Components
import PageWrapper from "@/common/components/UI/PageWrapper";
import CustomText from "@/common/components/UI/CustomText";

//Miscellaneous Imports
import { categories } from "@/common/typography/categories";

const Categories = () => {
  return (
    <>
      <Head>
        <title>Briskbuy | Categories</title>
      </Head>
      <PageWrapper>
        <Box margin={8}>
          <CustomText
            variant="largeHeading"
            text={categories.heading}
            fontSize="5xl"
            lineHeight="60px"
          />
        </Box>
      </PageWrapper>
    </>
  );
};

export default Categories;
