import { resolver } from "blitz"
import db from "../../../db"

export default resolver.pipe(async () => {
  return db.announcement.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
    },
  })
})
