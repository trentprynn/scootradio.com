import { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

export default function Document() {
    return (
        <Html>
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="description"
                    content="Scoot Radio is the easiest way to listen to curated public radio stations. Avoid ads and find new music with Scoot Radio!"
                />
                <meta property="og:title" content="Scoot Radio" />
                <meta property="og:image" content="https://scootradio.com/default.png" />
                <meta
                    property="og:description"
                    content="Scoot Radio is the easiest way to listen to curated public radio stations. Avoid ads and find new music with Scoot Radio!"
                />
                <link rel="apple-touch-icon" href="https://scootradio.com/logo192.png" />
                <link rel="manifest" href="https://scootradio.com/manifest.json" />

                {process.env.NODE_ENV === 'production' && (
                    <React.Fragment>
                        <script async defer data-collect-dnt="true" src="https://sa.scootradio.com/latest.js"></script>
                        <noscript>
                            <img // eslint-disable-line
                                src="https://sa.scootradio.com/noscript.gif?collect-dnt=true"
                                alt=""
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </noscript>
                    </React.Fragment>
                )}
            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
