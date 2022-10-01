import { gSSP } from "app/blitz-server"
import { useMutation } from "@blitzjs/rpc"
import Router from "next/router"
import { GetServerSideProps } from "next"
import { BlitzPage } from "@blitzjs/next"
import React from "react"
import AdminLayout from "../../../../../app/admin/layout"
import db, { Announcement } from "db"
import { Button, Form, Input, message } from "antd"
import editAnnouncement from "../../../../../app/admin/mutations/announcements/editAnnouncement"
import deleteAnnouncement from "../../../../../app/admin/mutations/announcements/deleteAnnouncement"

type Props = {
  alert: Announcement
}

const EditAlert: BlitzPage<Props> = ({ alert }) => {
  const [edit] = useMutation(editAnnouncement)
  const [del] = useMutation(deleteAnnouncement)

  return (
    <div>
      <Form
        onFinish={async (values) => {
          await edit(values)
            .then(() => message.success("수정 성공"))
            .catch(() => message.error("수정 중 오류가 발생했습니다"))
        }}
        initialValues={alert}
        layout="vertical"
      >
        <Form.Item name="id" hidden rules={[{ type: "number", required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="title" label="제목" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="content" label="내용" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <div style={{ display: "flex", gap: 12 }}>
            <Button type="primary" htmlType="submit" style={{ flexGrow: 1 }}>
              저장
            </Button>
            <Button
              danger
              onClick={async () => {
                if (confirm("공지를 삭제할까요? 복구 불가능합니다")) {
                  await del(alert.id)
                    .then(() => {
                      message.success("삭제 성공")
                      return Router.push("/admin/alerts")
                    })
                    .catch(() => message.error("삭제 실패"))
                }
              }}
              type="primary"
              style={{ flexGrow: 1 }}
            >
              삭제
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

EditAlert.getLayout = (component) => <AdminLayout>{component}</AdminLayout>

// @ts-expect-error sans
export const getServerSideProps: GetServerSideProps<Props> = gSSP(async (ctx) => {
  const v = parseInt(ctx.query.id as string)
  if (isNaN(v))
    return {
      notFound: true,
    }
  const item = await db.announcement.findUnique({
    where: {
      id: v,
    },
  })

  if (!item) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      alert: item,
    },
  }
})

export default EditAlert
