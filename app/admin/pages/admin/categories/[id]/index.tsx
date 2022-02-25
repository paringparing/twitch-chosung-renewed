import React from "react"
import { BlitzPage, GetServerSideProps, useMutation } from "blitz"
import AdminLayout from "../../../../layout"
import db, { OfficialCategory } from "db"
import { Button, Checkbox, Form, Input, notification, Space } from "antd"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import updateCategory from "../../../../mutations/categories/updateCategory"

type Props = {
  category: OfficialCategory
}

const CategoryEdit: BlitzPage<Props> = ({ category }) => {
  const [form] = Form.useForm()
  const [updateMutation] = useMutation(updateCategory)

  return (
    <div>
      <Form
        form={form}
        initialValues={category}
        onFinish={async (data) => {
          await updateMutation(data)
          notification.open({
            type: "success",
            message: "저장 성공",
          })
        }}
      >
        <Form.Item hidden name="id" rules={[{ type: "number" }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="name" label="이름" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="설명" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="available" valuePropName="checked">
          <Checkbox>유저에게 표시</Checkbox>
        </Form.Item>
        <Form.List name="words">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Form.Item
                    {...restField}
                    rules={[{ required: true }]}
                    name={[name, "word"]}
                    style={{ flexGrow: 1 }}
                  >
                    <Input placeholder="단어" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    rules={[{ required: true }]}
                    name={[name, "hint"]}
                    style={{ flexGrow: 1 }}
                  >
                    <Input placeholder="힌트" />
                  </Form.Item>
                  <Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Form.Item>
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  단어 추가하기
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button style={{ width: "100%" }} type="primary" htmlType="submit">
            저장
          </Button>
        </Form.Item>
      </Form>
      {JSON.stringify(category)}
    </div>
  )
}

CategoryEdit.getLayout = (component) => <AdminLayout>{component}</AdminLayout>

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  if (isNaN(Number(ctx.query.id)))
    return {
      notFound: true,
    }

  const item = await db.officialCategory.findUnique({
    where: {
      id: Number(ctx.query.id),
    },
    include: {
      words: true,
    },
  })

  if (!item) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      category: item,
    },
  }
}

export default CategoryEdit
