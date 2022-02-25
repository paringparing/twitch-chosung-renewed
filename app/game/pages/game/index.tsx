import React from "react"
import { BlitzPage, Router } from "blitz"
import GameLayout from "../../layout"
import { MdAccessTime } from "react-icons/md"
import { useRecoilState } from "recoil"
import { STimeLimit } from "../../utils/store"
import { Button } from "../../components/Button"
import { Colors } from "../../constants"

const TimeInput: React.FC = () => {
  const [timeLimit, setTimeLimit] = useRecoilState(STimeLimit)

  return (
    <div className="container">
      <MdAccessTime size={36} />
      <input
        value={timeLimit}
        onChange={(e) => setTimeLimit(Number(e.target.value))}
        type="number"
      />
      <div className="end">초</div>
      <style jsx>{`
        .container {
          width: 400px;
          height: 80px;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.2);
          padding-left: 20px;
          padding-right: 20px;
          border-radius: 20px;
        }
        .end {
          font-size: 24px;
          font-weight: 800;
        }
        input {
          background: transparent;
          border: none;
          outline: none;
          font-size: 24px;
          font-weight: 800;
          flex-grow: 1;
          height: 100%;
        }
        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  )
}

const Game: BlitzPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ fontSize: 64, fontWeight: 800 }}>게임 설정</div>
      <TimeInput />
      <Button
        onClick={() => Router.push("/game/selectCategory")}
        color={Colors.purple}
        style={{ width: 400 }}
      >
        주제 선택
      </Button>
      <Button disabled style={{ width: 400 }}>
        게임 시작
      </Button>
    </div>
  )
}

Game.getLayout = (component) => <GameLayout>{component}</GameLayout>

export default Game
