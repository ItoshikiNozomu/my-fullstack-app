import { version } from "antd"
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Main,
  NextScript,
  Head,
} from "next/document"
import Script from "next/script"
import { ServerStyleSheet } from "styled-components"
import SiteHead from "../common/components/SiteHead"


const infuraAuth = Buffer.from(
  process.env.IPFS_PROJECT_ID + ":" + process.env.IPFS_SECRET
).toString("base64")
export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>,
        ],
      }
    } finally {
      sheet.seal()
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <script
            id="auth_injection"
            dangerouslySetInnerHTML={{
              __html: `window.infuraAuth = '${infuraAuth}'`,
            }}
          ></script>
          <link
            rel="stylesheet"
            href={`https://cdn.bootcdn.net/ajax/libs/antd/${version}/antd.compact.css`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
