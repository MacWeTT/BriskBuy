import "@/styles/globals.css";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from "@/common/components/Layout";
import BlankLayout from "@/common/components/BlankLayout";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/common/redux/store";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const AuthRoute = router.pathname.startsWith("/auth");

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {AuthRoute ? (
            <BlankLayout>
              <Component {...pageProps} />
            </BlankLayout>
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
