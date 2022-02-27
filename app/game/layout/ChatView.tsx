import React from "react"
import { useTmi } from "../utils/tmi"
import { ChatUserstate } from "tmi.js"
import { useRecoilState } from "recoil"
import { SChatData } from "../utils/store"
import { useCurrentUser } from "../../core/hooks/useCurrentUser"

const ChatView: React.FC = () => {
  const t = useTmi()
  const [chatData, setChatData] = useRecoilState(SChatData)
  const container = React.useRef<HTMLDivElement | null>(null)
  const user = useCurrentUser()!

  React.useEffect(() => {
    const tmi = t

    const onChat = (channel: string, us: ChatUserstate, message: string) => {
      setChatData((chat) => {
        const newArray = [
          ...chat,
          {
            chat: message,
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
      console.log("reset")
      tmi.removeListener("chat", onChat)
      console.log(tmi)
    }
  }, [setChatData, t])

  React.useEffect(() => {
    const c = container.current
    if (c) {
      c.scrollTop = c.scrollHeight
    }
  }, [chatData, container])

  return (
    <div className="container" ref={(i) => (container.current = i)}>
      <div>#{user.channel}</div>
      {chatData.map((x, i) => (
        <div key={i}>
          {x.user}&nbsp;&nbsp;&nbsp;&nbsp;
          {x.chat}
        </div>
      ))}
      <style jsx>{`
        .container {
          background: rgba(255, 255, 255, 0.2);
          word-break: break-all;
          border-radius: 20px;
          padding: 30px;
          flex-grow: 1;
          font-size: 30px;
          height: 0;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default ChatView
