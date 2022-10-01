import { gSSP } from "app/blitz-server"
import { GetServerSideProps } from "next"
import { BlitzPage } from "@blitzjs/next"
import db, { Announcement } from "db"
import React from "react"
import Layout from "../../../app/core/layouts/Layout"
import dayjs from "dayjs"
import ReactMarkdown from "react-markdown"

type Props = {
  alert: Announcement
}

const AnnouncementViewer: BlitzPage<Props> = ({ alert }) => {
  const date = React.useMemo(() => {
    return dayjs(alert.createdAt).format("YYYY-MM-DD")
  }, [alert.createdAt])

  return (
    <div style={{ padding: 24, paddingTop: 24 + 80 }}>
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: 1100,
          background: "rgba(0, 0, 0, 0.2)",
          padding: 24,
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <div style={{ fontSize: 32, flexGrow: 1, width: 0, fontWeight: 800 }}>{alert.title}</div>
          <div style={{ fontSize: 16 }}>{date}</div>
        </div>
      </div>
      <div
        style={{
          marginTop: 16,
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: 1100,
          background: "rgba(0, 0, 0, 0.2)",
          padding: 24,
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          color: "#fff",
        }}
      >
        <div className="markdown-body" style={{ marginTop: 10 }}>
          <ReactMarkdown>{alert.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

AnnouncementViewer.getLayout = (component) => <Layout>{component}</Layout>

// @ts-expect-error sans
export const getServerSideProps: GetServerSideProps<Props> = gSSP(async (ctx) => {
  const i = parseInt(ctx.query.id as string)
  if (isNaN(i)) return { notFound: true }

  const item = await db.announcement.findUnique({
    where: {
      id: i,
    },
  })
  if (!item)
    return {
      notFound: true,
    }
  return {
    props: {
      alert: item,
    },
  }
})

export default AnnouncementViewer
