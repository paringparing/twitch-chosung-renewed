import React from "react"
import { currentGameMode, GameMode } from "../utils/store"
import { useRecoilState } from "recoil"
import clsx from "clsx"

const ModSelectButton: React.FC<{ active: boolean; onClick: () => void }> = ({
  children,
  onClick,
  active,
}) => {
  return (
    <div className={clsx("button", { active })} onClick={onClick}>
      {children}
      <style jsx>
        {`
          .button {
            height: 60px;
            background: rgba(255, 255, 255, 0.2);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 20px;
            font-size: 24px;
            font-weight: 800;
            cursor: pointer;
            transition: all ease 0.2s;
          }
          .button:hover {
            filter: brightness(0.9);
          }
          .button:active {
            filter: brightness(0.8);
          }
          .button.active {
            background: #6993ff;
            color: #fff;
          }
        `}
      </style>
    </div>
  )
}

const Sidebar: React.FC = () => {
  const [gameMode, setGameMode] = useRecoilState(currentGameMode)

  return (
    <div className="container">
      <div className="modSelect card">
        <div style={{ fontSize: 40, fontWeight: 800 }}>모드 선택</div>
        <ModSelectButton
          onClick={() => setGameMode(GameMode.Suggested)}
          active={gameMode === GameMode.Suggested}
        >
          추천
        </ModSelectButton>
        <ModSelectButton
          onClick={() => setGameMode(GameMode.Custom)}
          active={gameMode === GameMode.Custom}
        >
          커스텀
        </ModSelectButton>
      </div>
      <div className="card" style={{ flexGrow: 1 }}>
        chat
      </div>
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
