import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

import theme from "@/styles/theme";

function App({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;