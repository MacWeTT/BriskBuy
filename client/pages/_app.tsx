import "@/styles/globals.css";
import type { AppProps } from "next/app";

//Chakra UI
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@/common/components/Layout";
import theme from "@/common/theme/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
