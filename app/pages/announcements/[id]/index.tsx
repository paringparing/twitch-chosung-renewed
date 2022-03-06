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

  const adArea = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (adArea.current) {
      const container = adArea.current
      const ins = document.createElement("ins")
      const script = document.createElement("script")
      ins.className = "kakao_ad_area"
      ins.style.display = "none"
      script.async = Boolean("true")
      script.type = "text/javascript"
      script.src = "//t1.daumcdn.net/kas/static/ba.min.js"
      ins.setAttribute("data-ad-width", "728")
      ins.setAttribute("data-ad-height", "90")
      ins.setAttribute("data-ad-unit", "DAN-4UZMZ0rJDZb5OwW7")
      container.appendChild(ins)
      container.appendChild(script)
      return () => {
        ins.remove()
        script.remove()
      }
    }
  }, [])

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
        <div
          style={{ display: "flex", justifyContent: "center" }}
          ref={(i) => (adArea.current = i)}
        />
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
