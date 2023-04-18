import "@/styles/index.css";
import Head from "next/head";
import { Header, Footer } from "@/components";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AniAni</title>
      </Head>
      <main>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </main>
    </>
  );
}
