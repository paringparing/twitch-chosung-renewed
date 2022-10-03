import { useMutation } from "@blitzjs/rpc"
import Router from "next/router"
import { BlitzPage } from "@blitzjs/next"
import React from "react"
import AdminLayout from "../../../app/admin/layout"
import { Button, Form, Input, message } from "antd"
import createAnnouncement from "../../../app/admin/mutations/announcements/createAnnouncement"

const New: BlitzPage = () => {
  const [form] = Form.useForm()
  const [create] = useMutation(createAnnouncement)

  return (
    <div>
      <div style={{ fontSize: 24 }}>공지 작성</div>
      <Form
        form={form}
        layout="vertical"
        onFinish={async (values) => {
          await create(values)
            .then((id) => {
              message.success("공지 등록 성공")
              return Router.push(`/admin/alerts/edit/${id}`)
            })
            .catch(() => message.error("공지 등록 실패"))
        }}
      >
        <Form.Item label="제목" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="내용"
          name="content"
          help="마크다운을 지원합니다"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={20} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            완료
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

New.getLayout = (component) => <AdminLayout>{component}</AdminLayout>

export default New
