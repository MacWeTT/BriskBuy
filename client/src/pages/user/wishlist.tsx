import Head from "next/head";

//Custom Components
import PageWrapper from "@/common/components/UI/PageWrapper";
import CustomText from "@/common/components/UI/CustomText";

const Wishlist = () => {
  return (
    <>
      <Head>
        <title>Wishlist | Briskbuy</title>
      </Head>
      <PageWrapper>
        <CustomText variant="heading" text="Your Wishlist" />
      </PageWrapper>
    </>
  );
};

export default Wishlist;
