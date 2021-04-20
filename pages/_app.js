import { ChakraProvider, ColorModeProvider, CSSReset } from "@chakra-ui/react";
import theme from "@/styles/theme";
import NavBar from "@/components/NavBar";

import Head from "next/head";
import { css, Global } from "@emotion/react";
import { CartProvider } from "@/context/cart";

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
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <CartProvider>
          <GlobalStyle />
          <NavBar />
          <Component {...pageProps} />
        </CartProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;
