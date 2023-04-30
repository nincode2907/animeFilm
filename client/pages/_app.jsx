import Head from "next/head";
import ContextProvider from "@/context/ContextProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="m-0 p-0 box-border font-serif">
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </div>
  );
}
