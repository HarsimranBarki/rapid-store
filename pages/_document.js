import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";
import favicon from "public/favicon.png";
export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="images/png" sizes="32x32" href={favicon} />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Source+Sans+Pro:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
