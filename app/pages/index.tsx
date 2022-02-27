import { BlitzPage, Router } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Button } from "../game/components/Button"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Home: BlitzPage = () => {
  return (
    <div style={{ width: "100vw" }}>
      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
        }}
        className="section1"
      >
        <div>
          <div style={{ fontSize: 32, fontWeight: 800 }}>초성 퀴즈</div>
          <div style={{ fontSize: 24 }}>트위치에서 하는 초성게임</div>
          <Button
            style={{
              fontSize: 16,
              paddingLeft: 24,
              paddingRight: 24,
              height: 40,
            }}
            onClick={() => Router.push("/game")}
          >
            플레이하기
          </Button>
        </div>
        <div style={{ width: "60%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            style={{
              width: "100%",
              maxWidth: 1280 * 0.75,
              maxHeight: 720 * 0.75,
              borderRadius: 20,
            }}
            src={"/assets/img/landing/play.png"}
            className="img"
            alt=""
          />
        </div>
      </div>
      <style jsx>{`
        @media screen and (max-width: 1023px) {
          .responsiveFlex {
            flex-direction: column;
          }
          .section1 {
            flex-direction: column;
          }
          .section1:nth-child(0) {
            justify-content: flex-end;
          }
        }
        .section1 > div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex-grow: 1;
          gap: 8px;
        }
        .img {
          box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
        }
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

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
