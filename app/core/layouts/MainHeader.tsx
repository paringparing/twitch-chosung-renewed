import Link from "next/link"
import React from "react"

const MainHeader: React.FC = () => {
  return (
    <div
      style={{
        padding: 20,
        width: "100%",
        position: "fixed",
        left: 0,
        top: 0,
        background: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: 1100,
          color: "#fff",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link href="/" passHref>
          <a style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>초성 퀴즈</a>
        </Link>
        <div style={{ flexGrow: 1 }} />
        <Link href={"/announcements"} passHref>
          <a style={{ fontSize: 24, color: "#fff" }}>Notice</a>
        </Link>
      </div>
    </div>
  )
}

export default MainHeader
