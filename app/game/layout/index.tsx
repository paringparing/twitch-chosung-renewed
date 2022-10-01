import { useQuery } from "@blitzjs/rpc"
import Router, { useRouter } from "next/router"
import React, { PropsWithChildren } from "react"
import Sidebar from "./Sidebar"
import { useCurrentUser } from "../../core/hooks/useCurrentUser"
import { RevolvingDot } from "react-loader-spinner"
import LoginButton from "../../core/components/LoginButton"
import { useScale } from "../utils/scale"
import { useRecoilValue } from "recoil"
import { SDisablePadding } from "../utils/store"
import getLatestAlert from "../queries/getLatestAlert"
import { Colors } from "../constants"
import { MdCampaign } from "react-icons/md"

const GameLayout: React.FC<PropsWithChildren> = (props) => {
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
      <GameLayoutContent {...props} />
    </React.Suspense>
  )
}

const GameLayoutContent: React.FC<PropsWithChildren> = ({ children }) => {
  const user = useCurrentUser()
  const scale = useScale()
  const disablePadding = useRecoilValue(SDisablePadding)
  const [latestAlert] = useQuery(getLatestAlert, null)
  const router = useRouter()

  return (
    <>
      <div className="container gameLayout">
        {user ? (
          <div
            className="content"
            style={{
              transform: `scale(${scale}) translate(-50%, -50%)`,
            }}
          >
            <Sidebar />
            <div
              style={{ flexGrow: 1, gap: 30, display: "flex", flexDirection: "column", width: 0 }}
            >
              {latestAlert && router.pathname === "/game" && (
                <div
                  style={{
                    background: Colors.red,
                    height: 60,
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    padding: "0 20px",
                    color: "#fff",
                    gap: 20,
                    fontSize: 24,
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                  onClick={() => Router.push(`/announcements/${latestAlert.id}`)}
                >
                  <MdCampaign size={48} />
                  {latestAlert.title}
                </div>
              )}
              <div className="card" style={{ padding: disablePadding ? 0 : 30, height: 0 }}>
                {children}
              </div>
              {/*<div style={{ height: 90, width: 728 }} ref={(i) => (adArea.current = i)} />*/}
            </div>
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
            position: fixed;
            padding: 60px;
            top: 50%;
            left: 50%;
            transform-origin: left top;
            display: flex;
            gap: 30px;
          }
        `}</style>
      </div>
      {/*{overlay && (*/}
      {/*  <>*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        position: "fixed",*/}
      {/*        zIndex: 9998,*/}
      {/*        background: "rgba(0, 0, 0, 0.5)",*/}
      {/*        width: "100%",*/}
      {/*        height: "100%",*/}
      {/*        left: 0,*/}
      {/*        top: 0,*/}
      {/*        display: "flex",*/}
      {/*        justifyContent: "center",*/}
      {/*        alignItems: "center",*/}
      {/*      }}*/}
      {/*      onClick={() => setOverlay(null)}*/}
      {/*    />*/}

      {/*  </>*/}
      {/*)}*/}
    </>
  )
}

export default GameLayout
