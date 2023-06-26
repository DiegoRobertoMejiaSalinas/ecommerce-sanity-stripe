import { Layout } from "@/components";
import { ContextProvider } from "@/context/StateContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}
