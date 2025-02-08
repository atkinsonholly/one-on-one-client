import { ColorModeScript } from "@chakra-ui/react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import theme from "../styles/theme";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head >
          <link rel="stylesheet" href="./fonts/RubikGlitch-Regular.ttf" as="font" crossOrigin="" />
          <link rel="stylesheet" href="./fonts/Rubik-Black.ttf" as="font" crossOrigin="" />
          <link rel="stylesheet" href="./fonts/Rubik-BlackItalic.ttf" as="font" crossOrigin="" />
          <link rel="stylesheet" href="./fonts/Rubik-Bold.ttf" as="font" crossOrigin="" />
          <link rel="stylesheet" href="./fonts/Rubik-BoldItalic.ttf" as="font" crossOrigin="" />
          <link rel="stylesheet" href="./fonts/Rubik-ExtraBold.ttf" as="font" crossOrigin="" />
          <link rel="stylesheet" href="./fonts/Rubik-ExtraBoldItalic.ttf" as="font" crossOrigin="" />
          <link rel="stylesheet" href="./fonts/Rubik-Italic.ttf" as="font" crossOrigin="" />
          <link rel="stylesheet" href="./fonts/Rubik-Light.ttf" as="font" crossOrigin="" />
          <link rel="stylesheet" href="./fonts/Rubik-LightItalic.ttf" as="font" crossOrigin="" />
          <link rel="stylesheet" href="./fonts/Rubik-Medium.ttf" as="font" crossOrigin="" />
          <link rel="stylesheet" href="./fonts/Rubik-MediumItalic.ttf" as="font" crossOrigin="" />
          <link rel="stylesheet" href="./fonts/Rubik-Regular.ttf" as="font" crossOrigin="" />
          <link rel="stylesheet" href="./fonts/Rubik-SemiBold.ttf" as="font" crossOrigin="" />
          <link rel="stylesheet" href="./fonts/Rubik-SemiBoldItalic.ttf" as="font" crossOrigin="" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;