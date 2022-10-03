import React from "react"
import { useTmi } from "../utils/tmi"
import { ChatUserstate } from "tmi.js"
import { useRecoilState, useRecoilValue } from "recoil"
import { SChatData, SCurrentWord, SShowPercent } from "../utils/store"
import { useCurrentUser } from "../../core/hooks/useCurrentUser"

const ChatView: React.FC = () => {
  const t = useTmi()
  const [chatData, setChatData] = useRecoilState(SChatData)
  const container = React.useRef<HTMLDivElement | null>(null)
  const user = useCurrentUser()!
  const currentWord = useRecoilValue(SCurrentWord)
  const showPercent = useRecoilValue(SShowPercent)

  React.useEffect(() => {
    const tmi = t

    const onChat = (channel: string, us: ChatUserstate, message: string) => {
      let c

      if (message.length === currentWord?.word.length && showPercent) {
        c = `${message.split("").filter((x, i) => currentWord.word[i] === x).length}/${
          message.length
        }`
      }

      setChatData((chat) => {
        const newArray = [
          ...chat,
          {
            chat: message,
            percent: c,
            user: us["display-name"] ?? us.username!,
          },
        ]
        if (newArray.length > 10) {
          newArray.shift()
        }
        return newArray
      })
    }

    tmi.on("chat", onChat)

    return () => {
      tmi.removeListener("chat", onChat)
    }
  }, [setChatData, t, showPercent, currentWord?.word])

  React.useEffect(() => {
    const c = container.current
    if (c) {
      c.scrollTop = c.scrollHeight
    }
  }, [chatData, container])

  return (
    <div className="container" ref={(i) => (container.current = i)}>
      <div style={{ fontWeight: 900 }}>#{user.channel}</div>
      {chatData.map((x, i) => (
        <div key={i}>
          {x.percent && <>{x.percent}&nbsp;&nbsp;</>}
          <span className="chat-username">{x.user}</span>&nbsp;&nbsp;
          <span>{x.chat}</span>
        </div>
      ))}
      <style jsx>{`
        .container {
          background: rgba(255, 255, 255, 0.2);
          word-break: break-all;
          border-radius: 20px;
          padding: 30px;
          flex-grow: 1;
          font-size: 24px;
          height: 0;
          overflow: hidden;
        }
        .chat-username {
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}

export default ChatView
