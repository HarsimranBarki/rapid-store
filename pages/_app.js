import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

import theme from "@/styles/theme";
import NavBar from "@/components/NavBar";

function App({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <NavBar />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;
