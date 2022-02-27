import db, { Announcement } from "db"
import React from "react"
import { BlitzPage, GetServerSideProps } from "blitz"
import Layout from "../../../core/layouts/Layout"
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
          background: "rgba(255, 255, 255, 0.5)",
          padding: 30,
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 800 }}>{alert.title}</div>
        <div style={{ fontSize: 16 }}>{date}</div>
        <div className="markdown-body" style={{ marginTop: 10 }}>
          <ReactMarkdown>{alert.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

AnnouncementViewer.getLayout = (component) => <Layout>{component}</Layout>

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
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
}

export default AnnouncementViewer
