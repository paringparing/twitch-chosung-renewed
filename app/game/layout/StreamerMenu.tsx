import React from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import {
  SCurrentWord,
  SCurrentWordIndex,
  SNoAnswer,
  SShowCategory,
  SShowHint,
  SWords,
} from "../utils/store"
import { Button } from "../components/Button"
import { Router } from "blitz"

const StreamerMenu: React.FC = () => {
  const currentWord = useRecoilValue(SCurrentWord)
  const [idx, setIdx] = useRecoilState(SCurrentWordIndex)
  const words = useRecoilValue(SWords)
  const [showCategory, setShowCategory] = useRecoilState(SShowCategory)
  const [showHint, setShowHint] = useRecoilState(SShowHint)
  const [noAnswer, setNoAnswer] = useRecoilState(SNoAnswer)

  return (
    <div className="card streamerMenu" style={{ textAlign: currentWord ? "left" : "center" }}>
      {currentWord ? (
        <>
          <div style={{ width: "100%", display: "flex" }}>
            <div style={{ flexGrow: 1, fontSize: 40, fontWeight: 800 }}>{currentWord.word}</div>
            <div style={{ fontSize: 30 }}>{currentWord.category}</div>
          </div>
          <div style={{ flexGrow: 1, width: "100%", fontSize: 30 }}>{currentWord.hint}</div>
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
