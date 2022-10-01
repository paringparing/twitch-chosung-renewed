import Head from "next/head"
import { BlitzLayout } from "@blitzjs/next"
import MainHeader from "./MainHeader"
import { FaTwitter } from "react-icons/fa"

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
      <footer className="footer">
        <div className="responsiveFlex" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
            className="responsiveFlex"
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
        <div>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://twitter.com/chosungquiz"
            style={{ color: "#fff" }}
          >
            <FaTwitter size={16} />
          </a>
        </div>
      </footer>
      <style jsx>{`
        .footer {
          background: rgba(0, 0, 0, 0.4);
          color: #fff;
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          padding: 20px 40px;
        }
        @media (max-width: 768px) {
          .responsiveFlex {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

export default Layout
