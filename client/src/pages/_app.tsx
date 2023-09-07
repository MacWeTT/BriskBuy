import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Next
import { useRouter } from "next/router";
import type { AppProps } from "next/app";

// Layouts
import Layout from "@/common/components/Layout";
import BlankLayout from "@/common/components/BlankLayout";

// Redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/common/redux/store";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const AuthRoute = router.pathname.startsWith("/auth");

  const googleClientID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={googleClientID}>
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
      </GoogleOAuthProvider>
    </Provider>
  );
}
