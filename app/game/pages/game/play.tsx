import React from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import {
  SCurrentWord,
  SCurrentWordIndex,
  SDisablePadding,
  SSelectedCustomWords,
  SSelectedOfficialWords,
  SShowCategory,
  SShowHint,
  STimeLimit,
  SWordCount,
  SWords,
} from "../../utils/store"
import { BlitzPage, Router, useMutation, useQuery } from "blitz"
import getWords from "../../mutations/words/getWords"
import { RevolvingDot } from "react-loader-spinner"
import getWordCount from "../../queries/words/getWordCount"
import GameLayout from "../../layout"
import { Colors } from "../../constants"
import Hangul from "hangul-js"

const Play: BlitzPage = () => {
  return (
    <React.Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <RevolvingDot width={160} height={160} color="#fff" />
        </div>
      }
    >
      <PlayContent />
    </React.Suspense>
  )
}

const useRandomWords = () => {
  const [words, setWords] = useRecoilState(SWords)
  const count = useRecoilValue(SWordCount)
  const official = useRecoilValue(SSelectedOfficialWords)
  const custom = useRecoilValue(SSelectedCustomWords)
  const [wordCount] = useQuery(getWordCount, { official, custom })

  const [getWordList] = useMutation(getWords)

  if (!words) {
    throw (async () => {
      if (!wordCount || !count) {
        await Router.push("/game")
        return
      }
      const words = await getWordList({ official, custom })

      setWords(words)
    })()
  }

  return words
}

const PlayContent: React.FC = () => {
  useRandomWords()
  const maxTime = useRecoilValue(STimeLimit)
  const [words, setWords] = useRecoilState(SWords)
  const [currentWordIndex, setCurrentWordIndex] = useRecoilState(SCurrentWordIndex)
  const [endsAt, setEndsAt] = React.useState(() => Date.now() + maxTime * 1000)
  const [remainingTime, setRemainingTime] = React.useState(1)
  const [noAnswer, setNoAnswer] = React.useState(false)
  const [shownChars, setShownChars] = React.useState<number[]>([])
  const [showHint, setShowHint] = useRecoilState(SShowHint)
  const [showCategory, setShowCategory] = useRecoilState(SShowCategory)

  const currentWord = useRecoilValue(SCurrentWord)

  const setDisablePadding = useSetRecoilState(SDisablePadding)

  const chars = React.useMemo(() => {
    return currentWord.word.split("").map((x, i) => {
      if (noAnswer || shownChars.includes(i)) {
        return x
      }
      return Hangul.d(x)[0]
    })
  }, [currentWord.word, noAnswer, shownChars])

  React.useEffect(() => {
    setDisablePadding(true)
    return () => setDisablePadding(false)
  }, [setDisablePadding])

  React.useEffect(() => {
    const interval = setInterval(() => {
      const remaining = endsAt - Date.now()
      if (remaining < 0) {
        clearInterval(interval)
        setShowCategory(true)
        setShowHint(true)
        setNoAnswer(true)
        setRemainingTime(0)
        return
      }
      const max = maxTime * 1000
      setRemainingTime(remaining / max)
    }, 100)
    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line
  }, [endsAt, maxTime, setRemainingTime])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: 20,
      }}
    >
      <div
        style={{
          background: Colors.red,
          height: 30,
          width: `${remainingTime * 100}%`,
          transition: "all linear 0.1s",
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {showCategory && (
          <div style={{ position: "absolute", left: 30, top: 30, fontSize: 64, fontWeight: 800 }}>
            {currentWord.category}
          </div>
        )}
        <div style={{ fontSize: 64, fontWeight: 800 }}>
          라운드 {currentWordIndex + 1} / {words?.length}
        </div>
        <div
          style={{
            overflow: "hidden",
            display: "flex",
            flexWrap: "wrap",
            padding: 10,
            background: Colors.blue,
            justifyContent: "center",
            borderRadius: 20,
            gap: 10,
            marginTop: 20,
          }}
        >
          {chars.map((x, i) => (
            <div
              key={i}
              style={{
                width: 120,
                height: 120,
                fontSize: 64,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: 800,
                color: Colors.blue,
                background: "#72D4B4",
                borderRadius: 10,
              }}
            >
              {x}
            </div>
          ))}
        </div>
        {showHint && (
          <div style={{ fontSize: 48, fontWeight: 800, marginTop: 20 }}>{currentWord.hint}</div>
        )}
        {noAnswer && (
          <div style={{ fontSize: 64, fontWeight: 800, marginTop: 50 }}>
            아무도 답을 맞히지 못했습니다
          </div>
        )}
      </div>
    </div>
  )
}

Play.getLayout = (component) => <GameLayout>{component}</GameLayout>

export default Play
