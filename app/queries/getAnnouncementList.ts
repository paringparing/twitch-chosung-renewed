import { resolver } from "@blitzjs/rpc"
import db from "../../db"

export default resolver.pipe(async () => {
  return db.announcement.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
  })
})
