import { useMutation, useQuery } from "@blitzjs/rpc"
import Router from "next/router"
import { BlitzPage } from "@blitzjs/next"
import React from "react"
import GameLayout from "../../app/game/layout"
import { MdAccessTime } from "react-icons/md"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import {
  gameUserStateStore,
  SAutoSkip,
  SAutoSkipTime,
  SContinuousBlock,
  SContinuousBlockCount,
  SCurrentWordIndex,
  SEnableTimeLimit,
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
} from "../../app/game/utils/store"
import { Button } from "../../app/game/components/Button"
import { Colors } from "../../app/game/constants"
import getWordCount from "../../app/game/queries/words/getWordCount"
import Slider from "rc-slider"
import startGame from "app/game/mutations/startGame"
import { FaCheck } from "react-icons/fa"

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
        onChange={(value) => setWCnt(value as number)}
      />
    </div>
  )
}

const AutoSizeNumberInput: React.FC<{
  value: number
  min?: number
  max?: number
  onChange: (v: number) => void
}> = ({ value, onChange, min, max }) => {
  const [text, setText] = React.useState("")

  return (
    <>
      <span className="container">
        <span className="size-calibration">{text}</span>
        <input
          min={min}
          max={max}
          ref={(i) => {
            setText(i?.value ?? "")
          }}
          type="number"
          value={value}
          onChange={(e) => {
            const n = +e.target.value

            if (isNaN(n) || n === Infinity) return

            if ((min && n < min) || (max && n > max)) {
              e.preventDefault()
              return
            }

            e.target.value = n as unknown as string

            onChange(n)

            setText(e.target.value)
          }}
          onClick={(e) => {
            ;(e as unknown as { cancel: boolean }).cancel = true
          }}
        />
      </span>
      <style jsx>
        {`
          .container {
            display: inline-block;
            position: relative;
            min-width: 1em;
            width: min-content;
            height: fit-content;
          }
          .size-calibration {
            visibility: hidden;
            font-weight: 900;

            white-space: pre;
          }
          input {
            padding: 0;
            margin: 0;
            left: 0;
            width: 100%;
            position: absolute;
            color: ${Colors.blue};
            font-weight: 900;
            background: transparent;
            border: none;
            caret-color: #000;
          }
          input:focus {
            outline: none;
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
        `}
      </style>
    </>
  )
}

const Game: BlitzPage = () => {
  const [official, setOfficial] = useRecoilState(SSelectedOfficialWords)
  const [custom, setCustom] = useRecoilState(SSelectedCustomWords)

  const available = React.useMemo(() => !!(official.length + custom.length), [official, custom])

  const [timeLimit, setTimeLimit] = useRecoilState(STimeLimit)
  const [enableTimeLimit, setEnableTimeLimit] = useRecoilState(SEnableTimeLimit)
  const [blockContinuous, setBlockContinuous] = useRecoilState(SContinuousBlock)
  const [blockCountinuousCount, setBlockContinuousCount] = useRecoilState(SContinuousBlockCount)

  const setCurrentWordIndex = useSetRecoilState(SCurrentWordIndex)
  const setNoAnswer = useSetRecoilState(SNoAnswer)
  const setShowHint = useSetRecoilState(SShowHint)
  const setShowCategory = useSetRecoilState(SShowCategory)
  const setRankingData = useSetRecoilState(SRankingData)
  const setWords = useSetRecoilState(SWords)
  const [showPercent, setShowPercent] = useRecoilState(SShowPercent)
  const [showAnswerInMenu, setShowAnswerInMenu] = useRecoilState(SShowAnswerInMenu)
  const [autoSkip, setAutoSkip] = useRecoilState(SAutoSkip)
  const [autoSkipTime, setAutoSkipTime] = useRecoilState(SAutoSkipTime)
  const [startGameMut] = useMutation(startGame)

  React.useEffect(() => {
    setRankingData(null)
    // eslint-disable-next-line
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
      <style jsx>
        {`
          .setting-section-title {
            font-size: 24px;
            font-weight: 800;
          }
          .setting-section {
            display: flex;
            gap: 16px;
            flex-direction: column;
            flex-shrink: 0;
            width: 400px;
            align-items: center;
          }
          label.setting-checkbox {
            font-size: 24px;

            position: relative;

            display: flex;
            align-items: center;

            width: 100%;
          }
          label.setting-checkbox input {
            display: none;
          }
          label.setting-checkbox input + span {
            width: 28px;
            height: 28px;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.4);
            transition: all ease 0.2s;
            display: flex;
            justify-content: center;
            align-items: center;
            color: transparent;
          }
          label.setting-checkbox input:checked + span {
            background: ${Colors.blue};
            color: #fff;
          }
          label.setting-checkbox span + span {
            margin-left: 12px;
          }
          /*
          label.setting-checkbox input[type="checkbox"]::after {
            content: "";
            width: 28px;
            height: 28px;
            border: 4px solid ${Colors.blue};
            border-radius: 8px;
            position: absolute;
            left: -10px;
            transition: all ease 0.4s;
            transform: translateX(25%);
          }
          label.setting-checkbox input[type="checkbox"]:checked::after {
            background-color: ${Colors.blue};
          }
          label.setting-checkbox span {
            padding-left: 32px;
          }
          */
        `}
      </style>
      <div style={{ fontSize: 64, fontWeight: 800 }}>게임 설정</div>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <div className="setting-section">
          <div className="setting-section-title">스트리머 편의기능</div>
          <label
            onClick={(e) => {
              if ((e as unknown as { cancel: boolean }).cancel) {
                e.preventDefault()
              }
            }}
            className="setting-checkbox"
          >
            <input
              type="checkbox"
              checked={autoSkip}
              onChange={(e) => setAutoSkip(e.target.checked)}
            />
            <span>
              <FaCheck size={18} />
            </span>

            <span>
              정답 후{" "}
              <AutoSizeNumberInput min={1} value={autoSkipTime} onChange={setAutoSkipTime} />초 뒤
              자동 스킵
            </span>
          </label>
          <label className="setting-checkbox">
            <input
              type="checkbox"
              checked={showAnswerInMenu}
              onChange={(e) => setShowAnswerInMenu(e.target.checked)}
            />
            <span>
              <FaCheck size={18} />
            </span>

            <span>스트리머 메뉴에 정답 표시</span>
          </label>
        </div>
        <div className="setting-section">
          <div className="setting-section-title">게임 규칙</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div>
              <label className="setting-checkbox">
                <input
                  type="checkbox"
                  checked={showPercent}
                  onChange={(e) => setShowPercent(e.target.checked)}
                />
                <span>
                  <FaCheck size={18} />
                </span>
                <span>채팅에 맞은 글자 개수 표시</span>
              </label>
              <label
                onClick={(e) => {
                  if ((e as unknown as { cancel: boolean }).cancel) {
                    e.preventDefault()
                  }
                }}
                className="setting-checkbox"
              >
                <input
                  type="checkbox"
                  checked={enableTimeLimit}
                  onChange={(e) => setEnableTimeLimit(e.target.checked)}
                />
                <span>
                  <FaCheck size={18} />
                </span>

                <span>
                  <AutoSizeNumberInput value={timeLimit} onChange={setTimeLimit} />초 뒤 정답
                  없음으로 처리
                </span>
              </label>
              <label
                onClick={(e) => {
                  if ((e as unknown as { cancel: boolean }).cancel) {
                    e.preventDefault()
                  }
                }}
                className="setting-checkbox"
              >
                <input
                  type="checkbox"
                  checked={blockContinuous}
                  onChange={(e) => setBlockContinuous(e.target.checked)}
                />
                <span>
                  <FaCheck size={18} />
                </span>

                <span>
                  정답 후{" "}
                  <AutoSizeNumberInput
                    min={1}
                    value={blockCountinuousCount}
                    onChange={setBlockContinuousCount}
                  />
                  라운드 동안 정답 금지
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
      {available && (
        <React.Suspense fallback="Loading...">
          <WordCountSelector />
        </React.Suspense>
      )}
      <div style={{ display: "flex", gap: 16, justifyContent: "flex-end" }}>
        <Button
          onClick={() => {
            setOfficial([])
            setCustom([])
          }}
          color={Colors.purple}
          disabled={!(official.length + custom.length)}
        >
          선택된 주제({official.length + custom.length}개) 초기화
        </Button>
        <Button onClick={() => Router.push("/game/selectCategory")} color={Colors.purple}>
          주제 선택
        </Button>
        <Button
          disabled={!available}
          onClick={async () => {
            await startGameMut()
            setCurrentWordIndex(0)
            setNoAnswer(false)
            setShowHint(false)
            setShowCategory(false)
            setWords(null)
            setRankingData({})
            gameUserStateStore.clear()
            await Router.push("/game/play")
          }}
        >
          게임 시작
        </Button>
      </div>
    </div>
  )
}

Game.getLayout = (component) => <GameLayout>{component}</GameLayout>

export default Game
