import {
  Document,
  Html,
  DocumentHead,
  Main,
  BlitzScript,
  DocumentContext /*DocumentContext*/,
} from "blitz"
import { ServerStyleSheet } from "styled-components"

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="en">
        <DocumentHead />
        <body>
          <Main />
          <BlitzScript />
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8394045556541803" crossorigin="anonymous"/>
        </body>
      </Html>
    )
  }
}

export default MyDocument
