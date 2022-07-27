import Head from "next/head"
import { version } from "antd"
const SiteHead = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Head>
      <title>my site</title>
      {/* <link
        rel="stylesheet"
        href={`https://cdn.bootcdn.net/ajax/libs/antd/${version}/antd.compact.css`}
      /> */}
      {children}
    </Head>
  )
}
export default SiteHead
