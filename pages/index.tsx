import Router from "next/router"
import { BlitzPage } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import { Button } from "../app/game/components/Button"
import YouTube from "react-youtube"
import React from "react"
import { FaChevronDown } from "react-icons/fa"
import { useQuery } from "@blitzjs/rpc"
import getRandomCustomCategories from "app/queries/getRandomCustomCategories"
import { RevolvingDot } from "react-loader-spinner"
import Marquee from "react-fast-marquee"

const Home: BlitzPage = () => {
  const videoContainerRef = React.useRef<HTMLDivElement | null>(null)
  const [videoScale, setVideoScale] = React.useState(0)

  React.useEffect(() => {
    if (videoContainerRef.current) {
      const observer = new ResizeObserver((entries) => {
        const t = entries[0]!.contentRect
        setVideoScale(Math.min(1, t.width / 1920, t.height / 1080))
      })
      observer.observe(videoContainerRef.current)
      return () => {
        observer.disconnect()
      }
    }
  }, [videoContainerRef, setVideoScale])

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
          <FaChevronDown
            onClick={() => {
              window.scrollTo({
                behavior: "smooth",
                top: window.innerHeight,
              })
            }}
            size={32}
            style={{ marginTop: 24, cursor: "pointer" }}
          />
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
            src={"/assets/img/landing/playNew.png"}
            className="img"
            alt=""
          />
        </div>
      </div>
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "stretch",
          alignItems: "stretch",
        }}
        className="responsiveFlexReverse"
      >
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 48,
          }}
          className="videoContainer"
          ref={(instance) => (videoContainerRef.current = instance)}
        >
          <YouTube
            videoId="viqeGyydZLA"
            className="home__videoContainer"
            opts={{
              width: `${1920 * videoScale}`,
              height: `${1080 * videoScale}`,
            }}
          />
        </div>
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="videoContainer"
        >
          <div style={{ fontSize: 32, fontWeight: 800 }}>사용 설명</div>
          <div style={{ fontSize: 18 }}>사용법을 모르시나요? 영상으로 알아보세요.</div>
        </div>
      </div>
      <div style={{ marginBottom: 48 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 32, fontWeight: 800 }}>커스텀 주제</div>
          <div style={{ fontSize: 18 }}>
            기본 주제 뿐만 아니라 주제를 직접 만들어서 게임할 수 있어요!
          </div>
        </div>
        <React.Suspense fallback={<RevolvingDot width={160} height={160} color="#fff" />}>
          <CustomCategoryList />
        </React.Suspense>
      </div>
      <style jsx>{`
        @media screen and (max-width: 1023px) {
          .responsiveFlex {
            flex-direction: column;
          }
          .responsiveFlexReverse {
            flex-direction: column-reverse;
          }
          .section1 {
            flex-direction: column;
          }
          .section1:nth-child(0) {
            justify-content: flex-end;
          }
          .videoContainer {
            width: unset !important;
            height: 0;
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
        .videoContainer {
          width: 0;
        }
      `}</style>
    </div>
  )
}

const CustomCategoryList: React.FC = () => {
  const [data] = useQuery(getRandomCustomCategories, null)

  console.log(data)

  return (
    <Marquee pauseOnHover gradient={false}>
      {data.map((x, i) => (
        <div
          key={i}
          style={{
            background: "rgba(0, 0, 0, 0.2)",
            padding: 12,
            borderRadius: 8,
            color: "#fff",
            width: 360,
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginRight: 12,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              width: 0,
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              flexGrow: 1,
            }}
          >
            {x.name}
          </div>
          <div style={{ fontSize: 14 }}>{x.owner.name}</div>
        </div>
      ))}
    </Marquee>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
