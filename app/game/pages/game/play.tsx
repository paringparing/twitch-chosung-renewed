import React from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import {
  SAutoSkip,
  SCurrentWord,
  SCurrentWordIndex,
  SDisablePadding,
  SNoAnswer,
  SRankingData,
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
import { useTmi } from "../../utils/tmi"
import { ChatUserstate } from "tmi.js"
import Overlay from "../../components/Overlay"
import { Button } from "../../components/Button"
import { Howl } from "howler"
import _ from "lodash"

const correctSound = new Howl({
  src: "/assets/audio/correct.wav",
})

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

      setWords(_.sampleSize(words, count))
    })()
  }

  return words
}

const PlayContent: React.FC = () => {
  useRandomWords()
  const maxTime = useRecoilValue(STimeLimit)
  const [words] = useRecoilState(SWords)
  const [currentWordIndex, setCurrentWordIndex] = useRecoilState(SCurrentWordIndex)
  const [endsAt, setEndsAt] = React.useState(() => Date.now() + maxTime * 1000)
  const [remainingTime, setRemainingTime] = React.useState(1)
  const [noAnswer, setNoAnswer] = useRecoilState(SNoAnswer)
  const [shownChars, setShownChars] = React.useState<number[]>([])
  const [showHint, setShowHint] = useRecoilState(SShowHint)
  const [showCategory, setShowCategory] = useRecoilState(SShowCategory)
  const [matchedUser, setMatchedUser] = React.useState<string | null>(null)
  const [score, setScore] = React.useState<number>(0)
  const t = useTmi()
  const [rankingData, setRankingData] = useRecoilState(SRankingData)
  const autoSkip = useRecoilValue(SAutoSkip)

  const currentWord = useRecoilValue(SCurrentWord)!

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
    const tmi = t

    const listener = (channel: string, us: ChatUserstate, message: string) => {
      if (noAnswer || matchedUser) return
      console.log(message, currentWord.word)
      if (message === currentWord.word) {
        correctSound.play()
        const u = us["display-name"] ?? us.username!
        setMatchedUser(u)
        const score = Math.floor(10000 * ((endsAt - Date.now()) / (maxTime * 1000)))
        setScore(score)
        const d = { ...rankingData } ?? {}
        if (d[u]) {
          d[u] = {
            score: d[u]!.score + score,
            count: d[u]!.count + 1,
          }
        } else {
          d[u] = {
            score,
            count: 1,
          }
        }
        setRankingData(d)
      }
    }

    tmi.on("chat", listener)

    return () => {
      tmi.removeListener("chat", listener)
    }
    // eslint-disable-next-line
  }, [t, currentWord.word, noAnswer, setMatchedUser, matchedUser, endsAt])

  React.useEffect(() => {
    setEndsAt(Date.now() + maxTime * 1000)
  }, [currentWordIndex, maxTime])

  React.useEffect(() => {
    setShownChars([])
  }, [currentWordIndex])

  React.useEffect(() => {
    setDisablePadding(true)
    return () => setDisablePadding(false)
  }, [setDisablePadding])

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (matchedUser || noAnswer) {
        clearInterval(interval)
        return
      }
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
  }, [endsAt, maxTime, setRemainingTime, matchedUser, noAnswer])

  React.useEffect(() => {
    if (matchedUser && autoSkip) {
      const timeout = setTimeout(() => {
        if (!(words!.length - 1 === currentWordIndex)) {
          setShowHint(false)
          setShowCategory(false)
          setNoAnswer(false)
          setMatchedUser(null)
          setCurrentWordIndex(currentWordIndex + 1)
        }
      }, 5000)
      return () => {
        clearTimeout(timeout)
      }
    }
    // eslint-disable-next-line
  }, [matchedUser])

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
      <Overlay open={!!matchedUser}>
        <div style={{ fontSize: 64, fontWeight: 800, textAlign: "center", minWidth: 500 }}>
          {currentWord.word}
        </div>
        <div style={{ fontSize: 48, fontWeight: 800, textAlign: "center" }}>
          {matchedUser} 정답!
        </div>
        <div style={{ fontSize: 36, fontWeight: 800, textAlign: "center" }}>{score}</div>
        <Button
          onClick={async () => {
            if (words!.length - 1 === currentWordIndex) {
              await Router.push("/game/result")
            } else {
              setShowHint(false)
              setShowCategory(false)
              setNoAnswer(false)
              setMatchedUser(null)
              setCurrentWordIndex(currentWordIndex + 1)
            }
          }}
        >
          {words!.length - 1 === currentWordIndex ? "결과 보기" : "다음"}
        </Button>
      </Overlay>
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
              onClick={() => {
                if (currentWord.word[i] === x) {
                  return
                }
                if (!shownChars.includes(i)) {
                  const d = [...shownChars, i]
                  setShownChars(d)
                  const c = currentWord.word.split("").map((x, i) => {
                    if (d.includes(i)) {
                      return x
                    }
                    return Hangul.d(x)[0]
                  })

                  if (c.join("") === currentWord.word) {
                    setShowCategory(true)
                    setShowHint(true)
                    setNoAnswer(true)
                    setRemainingTime(0)
                  }
                }
              }}
            >
              {x}
            </div>
          ))}
        </div>
        {showHint && (
          <div style={{ fontSize: 48, fontWeight: 800, marginTop: 20, textAlign: "center" }}>
            {currentWord.hint}
          </div>
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
