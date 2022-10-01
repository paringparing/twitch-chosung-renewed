import { useRouter } from "next/router"
import React from "react"
import ChatView from "./ChatView"
import { useCurrentUser } from "../../core/hooks/useCurrentUser"
import { Button } from "../components/Button"
import { MdCopyAll } from "react-icons/md"
import { message } from "antd"
import StreamerMenu from "./StreamerMenu"
import Leaderboard from "./Leaderboard"
import { useRecoilValue } from "recoil"
import { SRankingData } from "../utils/store"

const Sidebar: React.FC = () => {
  const user = useCurrentUser()!
  const rankingData = useRecoilValue(SRankingData)
  const router = useRouter()

  const isResultPage = router.pathname !== "/game/play"

  return (
    <div className="container">
      {!isResultPage && <Leaderboard />}
      {(!rankingData || isResultPage) && (
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {user.avatar ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={user.avatar} alt="" style={{ width: 60, height: 60, borderRadius: 30 }} />
            ) : (
              <div style={{ width: 60, height: 60, borderRadius: 30, background: "#fff" }} />
            )}
            <div style={{ fontSize: 32, fontWeight: 600 }}>{user.name}</div>
            <div
              style={{ fontSize: 24, opacity: 0.6, display: "flex", alignItems: "center", gap: 10 }}
            >
              #{user.id}{" "}
              <MdCopyAll
                style={{ cursor: "pointer" }}
                onClick={async () => {
                  await navigator.clipboard.writeText(user.id)
                  await message.success("복사되었습니다")
                }}
              />
            </div>
          </div>
          <Button as="a" href={"/api/auth/logout"} style={{ width: "100%", marginTop: 12 }}>
            로그아웃
          </Button>
        </div>
      )}
      <ChatView />
      <StreamerMenu />
      <style jsx>{`
        .container {
          height: 100%;
          width: 500px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .card {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 30px;
        }
        .modSelect {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .streamerMenu {
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          text-align: center;
          gap: 10px;
        }
      `}</style>
    </div>
  )
}

export default Sidebar
