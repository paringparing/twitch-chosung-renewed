import React from "react"
import { BlitzPage, Link, useQuery } from "blitz"
import Layout from "../../core/layouts/Layout"
import { RevolvingDot } from "react-loader-spinner"
import getAnnouncementList from "../../queries/getAnnouncementList"
import dayjs from "dayjs"

const AnnouncementList: BlitzPage = () => {
  return (
    <div style={{ padding: 24, paddingTop: 24 + 80 }}>
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: 1100,
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 800 }}>공지</div>
        <React.Suspense
          fallback={
            <div
              style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 60 }}
            >
              <RevolvingDot width={160} height={160} color="#fff" />
            </div>
          }
        >
          <AnnouncementListContent />
        </React.Suspense>
      </div>
    </div>
  )
}

const AnnouncementListContent: React.FC = () => {
  const [announcements] = useQuery(getAnnouncementList, null)

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
      ins.setAttribute("data-ad-unit", "DAN-KiSYEMQGDb95Mfiy")
      container.appendChild(ins)
      container.appendChild(script)
      return () => {
        ins.remove()
        script.remove()
      }
    }
  }, [])

  return (
    <div
      style={{ width: "100%", display: "flex", flexDirection: "column", gap: 20, marginTop: 10 }}
    >
      {announcements.map((x, i) => (
        <Link key={i} href={"/announcements/[id]"} as={`/announcements/${x.id}`}>
          <a
            style={{
              color: "#000",
              background: "rgba(255, 255, 255,0.2)",
              padding: 20,
              borderRadius: 20,
              display: "block",
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 800 }}>{x.title}</div>
            <div style={{ fontSize: 16 }}>{dayjs(x.createdAt).format("YYYY-MM-DD")}</div>
          </a>
        </Link>
      ))}
      <div
        style={{ display: "flex", justifyContent: "center" }}
        ref={(i) => (adArea.current = i)}
      />
    </div>
  )
}

AnnouncementList.getLayout = (component) => <Layout>{component}</Layout>

export default AnnouncementList
