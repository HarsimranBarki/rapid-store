import { ChakraProvider, ColorModeProvider, CSSReset } from "@chakra-ui/react";
import theme from "@/styles/theme";
import NavBar from "@/components/NavBar";

import Head from "next/head";
import { css, Global } from "@emotion/react";
import { CartProvider } from "@/context/cart";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Router } from "next/router";
import { CheckoutProvider } from "@/context/checkout";
import { AnimatePresence } from "framer-motion";

NProgress.configure({
  showSpinner: true,
  trickleRate: 0.1,
  trickleSpeed: 300,
});

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

Router.events.on("routeChangeError", () => {
  NProgress.done();
});

const GlobalStyle = ({ children }) => {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>Rapid Store</title>
      </Head>
      <CSSReset />
      <Global
        styles={css`
          html {
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  );
};

function App({ Component, pageProps }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <CartProvider>
            <CheckoutProvider>
              <GlobalStyle />

              <NavBar />
              <Component {...pageProps} />
            </CheckoutProvider>
          </CartProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </AnimatePresence>
  );
}

export default App;
