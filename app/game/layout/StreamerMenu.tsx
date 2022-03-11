import React from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import {
  SCurrentWord,
  SCurrentWordIndex,
  SNoAnswer,
  SShowAnswerInMenu,
  SShowCategory,
  SShowHint,
  SWords,
} from "../utils/store"
import { Button } from "../components/Button"
import { Router, useRouter } from "blitz"
import { Colors } from "../constants"

const StreamerMenu: React.FC = () => {
  const currentWord = useRecoilValue(SCurrentWord)
  const [idx, setIdx] = useRecoilState(SCurrentWordIndex)
  const words = useRecoilValue(SWords)
  const [showCategory, setShowCategory] = useRecoilState(SShowCategory)
  const [showHint, setShowHint] = useRecoilState(SShowHint)
  const [noAnswer, setNoAnswer] = useRecoilState(SNoAnswer)
  const showAnswerInMenu = useRecoilValue(SShowAnswerInMenu)
  const router = useRouter()

  const isResultPage = router.pathname !== "/game/play"

  return (
    <div className="card streamerMenu" style={{ textAlign: currentWord ? "left" : "center" }}>
      {currentWord && !isResultPage ? (
        <>
          {showAnswerInMenu ? (
            <>
              {" "}
              <div style={{ width: "100%", display: "flex" }}>
                <div style={{ flexGrow: 1, fontSize: 40, fontWeight: 800 }}>{currentWord.word}</div>
                <div style={{ fontSize: 30 }}>{currentWord.category}</div>
              </div>
              {/*<div style={{ width: "100%", fontSize: 30 }}>{currentWord.hint}</div>*/}
            </>
          ) : (
            <div style={{ fontSize: 32, fontWeight: 800, width: "100%" }}>정답 보기 비활성화됨</div>
          )}
          <div style={{ flexGrow: 1 }} />
          <div style={{ width: "100%" }}>
            <Button
              style={{ width: "100%" }}
              color={Colors.red}
              onClick={async () => {
                await Router.push("/game/result")
              }}
            >
              게임 즉시 종료(결과 보기)
            </Button>
          </div>
          <div style={{ display: "flex", gap: 10, width: "100%" }}>
            {noAnswer ? (
              <Button
                style={{ flexGrow: 1 }}
                onClick={async () => {
                  if (words!.length - 1 === idx) {
                    await Router.push("/game/result")
                  } else {
                    setShowCategory(false)
                    setShowHint(false)
                    setNoAnswer(false)
                    setIdx(idx + 1)
                  }
                }}
              >
                {words!.length - 1 === idx ? "결과 보기" : "다음 문제"}
              </Button>
            ) : (
              <>
                <Button
                  style={{ flexGrow: 1, width: 0 }}
                  onClick={() => setShowCategory((v) => !v)}
                >
                  주제 {showCategory ? "숨기기" : "공개"}
                </Button>
                <Button style={{ flexGrow: 1, width: 0 }} onClick={() => setShowHint((v) => !v)}>
                  힌트 {showHint ? "숨기기" : "공개"}
                </Button>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div style={{ fontSize: 40, fontWeight: 800 }}>스트리머용 메뉴</div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>
            여기에 정답과 여러 메뉴들이 표시됩니다
            <br />
            방송화면에서 이 부분을 가려주세요
          </div>
        </>
      )}
      <style jsx>{`
        .card {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 30px;
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

export default StreamerMenu
