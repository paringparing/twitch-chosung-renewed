import { Head, BlitzLayout } from "blitz"
import MainHeader from "./MainHeader"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #00C98D 0%, #72C8AE 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Head>
        <title>{title || "초성 퀴즈"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainHeader />
      <div style={{ flexGrow: 1 }}>{children}</div>
      <div className="footer responsiveFlex">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            paddingRight: 20,
            paddingLeft: 20,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 800, flexGrow: 1 }}>초성 퀴즈</div>
          <div>
            Designed & developed by{" "}
            <a
              style={{ color: "#fff" }}
              href="https://github.com/pikokr"
              target="_blank"
              rel="noreferrer"
            >
              pikokr
            </a>{" "}
            / morrc
          </div>
        </div>
      </div>
      <style jsx>{`
        .footer {
          background: rgba(0, 0, 0, 0.4);
          color: #fff;
          padding: 20px;
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  )
}

export default Layout
