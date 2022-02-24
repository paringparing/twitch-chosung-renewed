import React from "react"
import { FaTwitch } from "react-icons/fa"

const LoginButton: React.FC = () => {
  return (
    <div className="container" onClick={() => (window.location.href = "/api/auth/login")}>
      <FaTwitch />
      트위치로 로그인
      <style jsx>{`
        .container {
          background: #6441a5;
          color: #fff;
          padding: 24px 48px;
          font-size: 24px;
          display: flex;
          gap: 24px;
          justify-content: center;
          align-items: center;
          border-radius: 20px;
          transition: all ease 0.2s;
          cursor: pointer;
          font-weight: 800;
        }
        .container:hover {
          filter: brightness(0.9);
        }
        .container:active {
          filter: brightness(0.8);
        }
      `}</style>
    </div>
  )
}

export default LoginButton
