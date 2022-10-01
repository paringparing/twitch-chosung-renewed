import { useQuery } from "@blitzjs/rpc"
import Router from "next/router"
import { BlitzPage } from "@blitzjs/next"
import React from "react"
import AdminLayout from "../../../app/admin/layout"
import getAlertList from "../../../app/admin/queries/alerts/getAlertList"
import { Button, Input, List, Typography } from "antd"

const Announcements: BlitzPage = () => {
  const [search, setSearch] = React.useState("")
  return (
    <div>
      <div style={{ fontSize: 24 }}>공지 목록</div>
      <div style={{ display: "flex", gap: 8 }}>
        <Input placeholder="검색" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button onClick={() => Router.push("/admin/alerts/new")}>추가</Button>
      </div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ListContent query={search} />
      </React.Suspense>
    </div>
  )
}

const ListContent: React.FC<{ query: string }> = ({ query }) => {
  const [alerts, { refetch }] = useQuery(getAlertList, query)

  React.useEffect(() => {
    refetch().then(() => console.log("refetch"))
  }, [refetch])

  return (
    <div style={{ marginTop: 12 }}>
      <List
        bordered
        dataSource={alerts}
        renderItem={(x) => (
          <List.Item
            onClick={() => Router.push(`/admin/alerts/edit/${x.id}`)}
            style={{ cursor: "pointer" }}
          >
            <Typography.Text>{x.title}</Typography.Text>
          </List.Item>
        )}
      />
    </div>
  )
}

Announcements.getLayout = (component) => <AdminLayout>{component}</AdminLayout>

export default Announcements
