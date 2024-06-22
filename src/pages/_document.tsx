/* eslint-disable @next/next/no-img-element */
import { Head, Html, Main, NextScript } from 'next/document';
import { GeistSans } from 'geist/font/sans';
import { FB_PIXEL_ID } from '@/lib/fb-pixel';

export default function Document() {
  return (
    <Html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <Head>
        {/* Facebook pixel script */}
        <noscript>
          <img
            alt="facebook"
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      </Head>
      <body className={`${GeistSans.variable} font-sans`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
