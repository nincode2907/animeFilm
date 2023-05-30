import Head from "next/head";
import ContextProvider, { useStateContext } from "@/context/ContextProvider";
import "@/styles/globals.css";
import { useEffect } from "react";
import { Header, Footer } from "@/components/layout";

export default function App({ Component, pageProps }) {
  useEffect(() => {}, []);
  return (
    <>
      <link rel="stylesheet" href="/assets/images/favicon.png" />
      <div className="m-0 p-0 box-border font-sans dark:bg-black bg-white min-h-screen overflow-x-hidden">
        <ContextProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ContextProvider>
      </div>
    </>
  );
}
