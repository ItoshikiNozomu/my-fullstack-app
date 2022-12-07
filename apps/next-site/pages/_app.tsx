import React, { FC } from "react"
import { AppProps } from "next/app"

import Head from "next/head"

import { RecoilRoot } from "recoil"
import GlobalContainer from "common/components/GlobalContainer"

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>my site</title>
    </Head>
    <RecoilRoot>
      <Component {...pageProps} />
      <GlobalContainer></GlobalContainer>
    </RecoilRoot>
  </>
)

export default WrappedApp
