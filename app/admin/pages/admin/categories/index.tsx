import React from "react"
import { BlitzPage, Router, useMutation, useQuery } from "blitz"
import AdminLayout from "../../../layout"
import getCategoryList from "../../../queries/categories/getCategoryList"
import { Button, Card, Form, Input, List, Modal } from "antd"
import createCategory from "../../../mutations/categories/createCategory"

const CategoryList: BlitzPage = () => {
  const [search, setSearch] = React.useState("")
  const [addDialog, setAddDialog] = React.useState(false)
  const [createForm] = Form.useForm()
  const [creating, setCreating] = React.useState(false)
  const [createCategoryMutation] = useMutation(createCategory)

  return (
    <div>
      <Modal
        title="주제 추가하기"
        visible={addDialog}
        confirmLoading={creating}
        onCancel={() => setAddDialog(false)}
        onOk={async () => {
          await createForm.validateFields().then(() => createForm.submit())
        }}
      >
        <Form
          onFinish={async (values) => {
            try {
              setCreating(true)
              const id = await createCategoryMutation(values)
              setCreating(false)
              await Router.push(`/admin/categories/${id}`)
            } catch {
              setCreating(false)
            }
          }}
          form={createForm}
        >
          <Form.Item required label="주제 제목" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item required label="주제 설명" name="description" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <div style={{ display: "flex", gap: 8 }}>
        <Input placeholder="검색" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button onClick={() => setAddDialog(true)}>추가</Button>
      </div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Content query={search} />
      </React.Suspense>
    </div>
  )
}

const Content: React.FC<{ query: string }> = ({ query }) => {
  const [categories, { refetch }] = useQuery(getCategoryList, query)

  React.useEffect(() => {
    refetch().then(() => console.log("refetch"))
  }, [refetch])

  return (
    <div style={{ marginTop: 12 }}>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={categories}
        renderItem={(x) => (
          <List.Item onClick={() => Router.push(`/admin/categories/${x.id}`)}>
            <Card hoverable>
              <div style={{ fontSize: 24 }}>{x.name}</div>
              {x.description}
            </Card>
            {/*</Link>*/}
          </List.Item>
        )}
      />
    </div>
  )
}

CategoryList.getLayout = (component) => <AdminLayout>{component}</AdminLayout>

export default CategoryList
