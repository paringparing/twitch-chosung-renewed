import Link from "next/link"
import Router from "next/router"
import { BlitzPage } from "@blitzjs/next"
import React from "react"
import GameLayout from "../../app/game/layout"
import { useRecoilValue } from "recoil"
import { SRankingData } from "../../app/game/utils/store"
import _ from "lodash"
import { FaArrowLeft } from "react-icons/fa"

const Result: BlitzPage = () => {
  const rankingData = useRecoilValue(SRankingData)

  const data = React.useMemo(() => {
    if (!rankingData) {
      return []
    }
    return _.reverse(
      _.sortBy(_.toPairs(rankingData!), (i) => i[1].score).map((x) => ({
        user: x[0],
        count: x[1].count,
        score: x[1].score,
      }))
    )
  }, [rankingData])

  if (!rankingData) {
    Router.push("/game")
    return <div />
  }

  return (
    <div style={{ width: "100%", display: "flex", height: "100%", flexDirection: "column" }}>
      <div style={{ marginBottom: 24 }}>
        <Link href={"/game"} passHref>
          <a
            style={{
              fontSize: 24,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              color: "#000",
            }}
          >
            <FaArrowLeft />
            <div>홈으로</div>
          </a>
        </Link>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
          flexGrow: 1,
          paddingRight: 20,
          height: 0,
        }}
      >
        <div className="stage" style={{ display: "flex", gap: 20 }}>
          <div className="item">
            <div className="text">{data[1]?.user}</div>
            <div className="table" style={{ height: 240 }}>
              <div className="rank">#2</div>
              {data[1]?.score && <div className="score">{data[1]?.score}점</div>}
              {data[1]?.count && <div className="score">정답 {data[1]?.count}개</div>}
            </div>
          </div>
          <div className="item">
            <div className="text">{data[0]?.user}</div>
            <div className="table" style={{ height: 300 }}>
              <div className="rank">#1</div>
              {data[0]?.score && <div className="score">{data[0]?.score}점</div>}
              {data[0]?.count && <div className="score">정답 {data[0]?.count}개</div>}
            </div>
          </div>
          <div className="item">
            <div className="text">{data[2]?.user}</div>
            <div className="table" style={{ height: 180 }}>
              <div className="rank">#3</div>
              {data[2]?.score && <div className="score">{data[2]?.score}점</div>}
              {data[2]?.count && <div className="score">정답 {data[2]?.count}개</div>}
            </div>
          </div>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", marginTop: 20, gap: 10 }}
          className="list"
        >
          {data.slice(3).map((x, i) => (
            <div key={i} className="item">
              <div>#{i + 4}</div>
              <div style={{ flexGrow: 1 }}>{x.user}</div>
              <div style={{ flexGrow: 1, textAlign: "right" }}>{x.score}점</div>
              <div style={{ flexGrow: 1, textAlign: "right" }}>정답 {x.count}개</div>
            </div>
          ))}
        </div>
        <style jsx>{`
          .stage {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 30px;
          }
          .stage .item {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
          }
          .stage .item .text {
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            padding-bottom: 10px;
            font-size: 32px;
            font-weight: 800;
          }
          .stage .item .table {
            width: 100%;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 32px;
            justify-content: flex-end;
            padding-bottom: 10px;
            font-weight: 800;
          }
          .list .item {
            padding: 20px 24px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 20px;
            display: flex;
            font-size: 24px;
            font-weight: 800;
            gap: 20px;
          }
        `}</style>
      </div>
    </div>
  )
}

Result.getLayout = (component) => <GameLayout>{component}</GameLayout>

export default Result
