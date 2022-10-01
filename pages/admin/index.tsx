import { BlitzPage } from "@blitzjs/next"
import React from "react"
import AdminLayout from "../../app/admin/layout"

const Dashboard: BlitzPage = () => {
  return <div>dashboard</div>
}

Dashboard.getLayout = (component) => <AdminLayout>{component}</AdminLayout>

export default Dashboard
