import React from "react"
import ChatView from "./ChatView"
import { useCurrentUser } from "../../core/hooks/useCurrentUser"
import { Button } from "../components/Button"

const Sidebar: React.FC = () => {
  const user = useCurrentUser()!

  return (
    <div className="container">
      <div className="card">
        <div style={{ fontSize: 32, fontWeight: 600 }}>{user.name}</div>
        <Button as="a" href={"/api/auth/logout"} style={{ width: "100%", marginTop: 12 }}>
          로그아웃
        </Button>
      </div>
      <ChatView />
      <div className="card streamerMenu">
        <div style={{ fontSize: 40, fontWeight: 800 }}>스트리머용 메뉴</div>
        <div style={{ fontSize: 24, fontWeight: 800 }}>
          여기에 정답과 여러 메뉴들이 표시됩니다
          <br />
          방송화면에서 이 부분을 가려주세요
        </div>
      </div>
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
