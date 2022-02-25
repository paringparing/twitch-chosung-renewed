import React from "react"
import { BlitzPage } from "blitz"
import AdminLayout from "../../layout"

const Dashboard: BlitzPage = () => {
  return <div>dashboard</div>
}

Dashboard.getLayout = (component) => <AdminLayout>{component}</AdminLayout>

export default Dashboard
