import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from "blitz"
import { RecoilRoot } from "recoil"
import { Head } from "next/head"
import "antd/dist/antd.css"
import "../../stylesheets/main.css"
import "../../stylesheets/markdown.css"
import "rc-slider/assets/index.css"

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <RecoilRoot>
      <Head>
        <title>초성 퀴즈</title>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.rawgit.com/innks/NanumSquareRound/master/nanumsquareround.min.css"
        />
        <script defer data-domain="csquiz.link" src="https://analytics.kimusoft.dev/js/plausible.js"/>
        <link rel="manifest" href="/manifest.json" />
      </Head>
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
            font-family: NanumSquareRound, sans-serif;
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
}

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
