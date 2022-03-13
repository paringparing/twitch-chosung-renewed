import React from "react"
import { BlitzPage, Router, useQuery } from "blitz"
import GameLayout from "../../layout"
import { MdAccessTime } from "react-icons/md"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import {
  SAutoSkip,
  SCurrentWordIndex,
  SNoAnswer,
  SRankingData,
  SSelectedCustomWords,
  SSelectedOfficialWords,
  SShowAnswerInMenu,
  SShowCategory,
  SShowHint,
  SShowPercent,
  STimeLimit,
  SWordCount,
  SWords,
} from "../../utils/store"
import { Button } from "../../components/Button"
import { Colors } from "../../constants"
import getWordCount from "../../queries/words/getWordCount"
import Slider from "rc-slider"
import { Checkbox } from "antd"

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

const WordCountSelector: React.FC = () => {
  const official = useRecoilValue(SSelectedOfficialWords)
  const custom = useRecoilValue(SSelectedCustomWords)

  const [wordCount] = useQuery(getWordCount, { official, custom })

  const [wCnt, setWCnt] = useRecoilState(SWordCount)

  return (
    <div style={{ width: 400, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontSize: 24, display: "flex" }}>
        <div style={{ flexGrow: 1 }}>단어 개수</div>
        <div>
          {wCnt} / {wordCount}
        </div>
      </div>
      <Slider
        max={wordCount}
        min={1}
        style={{ width: "100%" }}
        value={wCnt}
        onChange={(value) => setWCnt(value)}
      />
    </div>
  )
}

const Game: BlitzPage = () => {
  const official = useRecoilValue(SSelectedOfficialWords)
  const custom = useRecoilValue(SSelectedCustomWords)

  const available = React.useMemo(() => !!(official.length + custom.length), [official, custom])

  const setCurrentWordIndex = useSetRecoilState(SCurrentWordIndex)
  const setNoAnswer = useSetRecoilState(SNoAnswer)
  const setShowHint = useSetRecoilState(SShowHint)
  const setShowCategory = useSetRecoilState(SShowCategory)
  const setRankingData = useSetRecoilState(SRankingData)
  const setWords = useSetRecoilState(SWords)
  const [showPercent, setShowPercent] = useRecoilState(SShowPercent)
  const [showAnswerInMenu, setShowAnswerInMenu] = useRecoilState(SShowAnswerInMenu)
  const [autoSkip, setAutoSkip] = useRecoilState(SAutoSkip)

  React.useEffect(() => {
    setRankingData(null)
  }, [])

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
      <label
        style={{
          display: "flex",
          gap: 8,
          width: 400,
          alignItems: "center",
          transform: "scale(2) translate(25%, 0)",
          marginBottom: 5,
        }}
      >
        <Checkbox checked={showPercent} onChange={(e) => setShowPercent(e.target.checked)} />
        <span>채팅에 맞은 글자 개수 표시</span>
      </label>
      <label
        style={{
          display: "flex",
          gap: 8,
          width: 400,
          alignItems: "center",
          transform: "scale(2) translate(25%, 0)",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Checkbox checked={autoSkip} onChange={(e) => setAutoSkip(e.target.checked)} />
        <span>정답 후 5초 뒤 자동 스킵</span>
      </label>
      <label
        style={{
          display: "flex",
          gap: 8,
          width: 400,
          alignItems: "center",
          transform: "scale(2) translate(25%, 0)",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Checkbox
          checked={showAnswerInMenu}
          onChange={(e) => setShowAnswerInMenu(e.target.checked)}
        />
        <span>스트리머 메뉴에 정답 표시</span>
      </label>
      <TimeInput />
      {available && (
        <React.Suspense fallback="Loading...">
          <WordCountSelector />
        </React.Suspense>
      )}
      <Button
        onClick={() => Router.push("/game/selectCategory")}
        color={Colors.purple}
        style={{ width: 400 }}
      >
        주제 선택
      </Button>
      <Button
        disabled={!available}
        style={{ width: 400 }}
        onClick={async () => {
          setCurrentWordIndex(0)
          setNoAnswer(false)
          setShowHint(false)
          setShowCategory(false)
          setWords(null)
          setRankingData({})
          await Router.push("/game/play")
        }}
      >
        게임 시작
      </Button>
    </div>
  )
}

Game.getLayout = (component) => <GameLayout>{component}</GameLayout>

export default Game
