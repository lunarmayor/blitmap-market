import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;200;300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" type="image/svg" href="/exchangeIcon.svg" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@blitmap" />
          <meta name="twitter:creator" content="@blitmap" />
          <meta property="og:url" content="https://www.loot.exchange/" />
          <meta property="og:title" content="Blitmap Market" />
          <meta
            property="og:description"
            content="A community marketplace for blitmap"
          />
          <meta
            property="og:image"
            content="/https://lh3.googleusercontent.com/Q_Yb9MG3cNPelLduHcoQ0G5_6YESh_HjZfVUBeritA3Daj0nYR-kulNhqPcH-I2R8FGTg22e-DJbSuAuQ9G6HWa92RPYCNHyNaRL=h400"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
