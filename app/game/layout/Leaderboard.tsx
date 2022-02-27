import React from "react"
import { useRecoilValue } from "recoil"
import { SRankingData } from "../utils/store"
import _ from "lodash"

const Leaderboard: React.FC = () => {
  const rankingData = useRecoilValue(SRankingData)

  const data = React.useMemo(() => {
    if (!rankingData) {
      return []
    }
    return _.sortBy(_.toPairs(rankingData!), (i) => i[1].score).map((x) => x[0])
  }, [rankingData])

  return (
    <>
      {rankingData && (
        <div className="card" style={{ height: 300, display: "flex", gap: 20 }}>
          <div className="item">
            <div className="text">{data[1]}</div>
            <div className="table" style={{ height: 90 }}>
              #2
            </div>
          </div>
          <div className="item">
            <div className="text">{data[0]}</div>
            <div className="table" style={{ height: 140 }}>
              #1
            </div>
          </div>
          <div className="item">
            <div className="text">{data[2]}</div>
            <div className="table" style={{ height: 60 }}>
              #3
            </div>
          </div>
          <style jsx>{`
            .card {
              background: rgba(255, 255, 255, 0.2);
              border-radius: 20px;
              padding: 30px;
            }
            .item {
              flex-grow: 1;
              display: flex;
              flex-direction: column;
            }
            .item .text {
              flex-grow: 1;
              display: flex;
              justify-content: center;
              align-items: flex-end;
              padding-bottom: 10px;
              font-size: 24px;
              font-weight: 800;
            }
            .item .table {
              width: 100%;
              background: rgba(255, 255, 255, 0.2);
              font-size: 24px;
              display: flex;
              justify-content: center;
              align-items: flex-end;
              padding-bottom: 10px;
              font-weight: 800;
            }
          `}</style>
        </div>
      )}
    </>
  )
}

export default Leaderboard
