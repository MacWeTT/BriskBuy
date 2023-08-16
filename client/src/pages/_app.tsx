import "@/styles/globals.css";
import { useRouter } from "next/router";
import Layout from "@/common/components/Layout";
import BlankLayout from "@/common/components/BlankLayout";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const AuthRoute = router.pathname.startsWith("/auth");

  return AuthRoute ? (
    <BlankLayout>
      <Component {...pageProps} />
    </BlankLayout>
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
