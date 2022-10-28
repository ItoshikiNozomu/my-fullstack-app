import React, { FC } from "react"
import { AppProps } from "next/app"
import { wrapper } from "../store"
import Head from "next/head"
import Script from "next/script"
import { RecoilRoot } from "recoil"

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>my site</title>
    </Head>
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  </>
)

export default wrapper.withRedux(WrappedApp)
