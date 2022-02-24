import React from "react"
import Sidebar from "./Sidebar"
import { useCurrentUser } from "../../core/hooks/useCurrentUser"
import { RevolvingDot } from "react-loader-spinner"
import LoginButton from "../../core/components/LoginButton"

const GameLayoutContainer: React.FC = (props) => {
  return (
    <React.Suspense
      fallback={
        <div
          style={{
            background: "linear-gradient(135deg, #00c98d 0%, #72c8ae 100%)",
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RevolvingDot width={160} height={160} color="#fff" />
        </div>
      }
    >
      <GameLayout {...props} />
    </React.Suspense>
  )
}

const GameLayout: React.FC = ({ children }) => {
  const user = useCurrentUser()
  const containerRef = React.useRef<HTMLElement | null>()
  const [scale, setScale] = React.useState(0)

  React.useEffect(() => {
    const l = () => {
      setScale(Math.min(document.body.clientWidth / 1920, document.body.clientHeight / 1080))
    }
    window.addEventListener("resize", l)
    setScale(Math.min(document.body.clientWidth / 1920, document.body.clientHeight / 1080))
    return () => {
      window.removeEventListener("resize", l)
    }
  }, [])

  return (
    <div className="container" ref={(i) => (containerRef.current = i)}>
      {user ? (
        <div
          className="content"
          style={{
            transform: `scale(${scale}) translate(-50%, -50%)`,
          }}
        >
          <Sidebar />
          <div className="card">{children}</div>
        </div>
      ) : (
        <div className="login">
          <LoginButton />
        </div>
      )}
      <style jsx>{`
        .container {
          background: linear-gradient(135deg, #00c98d 0%, #72c8ae 100%);
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          position: relative;
        }
        .card {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 30px;
          flex-grow: 1;
        }
        .login {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
        }
        .content {
          width: 1920px;
          height: 1080px;
          position: absolute;
          padding: 60px;
          top: 50%;
          left: 50%;
          transform-origin: left top;
          display: flex;
          gap: 30px;
        }
      `}</style>
    </div>
  )
}

export default GameLayoutContainer
