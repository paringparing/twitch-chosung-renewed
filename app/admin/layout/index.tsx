import React from "react"
import { AuthorizationError, BlitzLayout, Router } from "blitz"
import { useCurrentUser } from "../../core/hooks/useCurrentUser"
import { RevolvingDot } from "react-loader-spinner"
import { Layout, Menu } from "antd"
import { AlertOutlined, DashboardOutlined, OrderedListOutlined } from "@ant-design/icons"

const AdminLayout: BlitzLayout = (props) => {
  return (
    <React.Suspense
      fallback={
        <div
          style={{
            background: "#fff",
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RevolvingDot width={160} height={160} color="#000" />
        </div>
      }
    >
      <AdminLayoutContent {...props} />
    </React.Suspense>
  )
}

const AdminLayoutContent: React.FC = ({ children }) => {
  const user = useCurrentUser()

  if (user?.role !== "ADMIN") {
    throw new AuthorizationError()
  }

  return (
    <Layout hasSider>
      <Layout.Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ height: 32, marginTop: 16, marginLeft: 16, color: "#fff" }}>초성 퀴즈</div>
        <Menu theme="dark" mode="inline">
          <Menu.Item
            key={0}
            icon={<DashboardOutlined />}
            onClick={() => {
              Router.push("/admin").then(() => console.log("moved to /admin"))
            }}
          >
            대시보드
          </Menu.Item>
          <Menu.Item
            key={1}
            icon={<OrderedListOutlined />}
            onClick={() => {
              Router.push("/admin/categories").then(() => console.log("moved to /admin/categories"))
            }}
          >
            공식 카테고리
          </Menu.Item>
          <Menu.Item
            key={2}
            icon={<AlertOutlined />}
            onClick={() => {
              Router.push("/admin/alerts").then(() => console.log("moved to /admin/alerts"))
            }}
          >
            공지
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout className="site-layout" style={{ marginLeft: 200, minHeight: "100vh" }}>
        <Layout.Content style={{ background: "#fff", margin: 24, padding: 24 }}>
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

AdminLayout.authenticate = true

export default AdminLayout
