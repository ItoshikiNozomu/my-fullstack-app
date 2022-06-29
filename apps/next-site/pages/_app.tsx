import React, { FC } from "react"
import { AppProps } from "next/app"
import { wrapper } from "../store"
import Head from "next/head"
import Script from "next/script"



const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>my site</title>
      
    </Head>
    <Component {...pageProps} />
  </>
)

export default wrapper.withRedux(WrappedApp)
