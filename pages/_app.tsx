import { withBlitz } from "app/blitz-client"
import Head from "next/head"

import { useQueryErrorResetBoundary } from "@blitzjs/rpc"

import {
  AppProps,
  ErrorBoundary,
  ErrorComponent as DefaultErrorComponent,
  ErrorComponent,
  ErrorFallbackProps,
} from "@blitzjs/next"
import { RecoilRoot } from "recoil"
import "antd/dist/antd.css"
import "../stylesheets/main.css"
import "../stylesheets/markdown.css"
import "rc-slider/assets/index.css"
import { AuthenticationError, AuthorizationError } from "blitz"
import NextNProgress from "nextjs-progressbar"
import { Colors } from "app/game/constants"

export default withBlitz(function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <RecoilRoot>
      <Head>
        <title>초성 퀴즈</title>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.5/dist/web/variable/pretendardvariable.css"
        />
        <script
          defer
          data-domain="csquiz.link"
          src="https://analytics.kimusoft.dev/js/plausible.js"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <NextNProgress color={Colors.blue} />
      <ErrorBoundary
        FallbackComponent={RootErrorFallback}
        onReset={useQueryErrorResetBoundary().reset}
      >
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
      <style jsx global>
        {`
          body {
            margin: 0;
            user-select: none;
            overflow-x: hidden;
          }
          * {
            box-sizing: border-box;
            font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
              "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
              "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
          }

          .dropdownContainer li {
            padding: 20px 24px;
            font-size: 24px;
            font-weight: 800;
            transition: all ease 0.2s;
            cursor: pointer;
            list-style: none;
          }
          .dropdownContainer li:hover {
            background: rgba(255, 255, 255, 0.4);
          }
        `}
      </style>
    </RecoilRoot>
  )
})

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    console.log(error)
    return <div>로그인이 필요합니다</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
