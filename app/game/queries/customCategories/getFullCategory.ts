import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(resolver.authorize(["ADMIN", "USER"]), (id: number, { session }) => {
  return db.customCategory.findFirst({
    where: {
      ownerId: session.userId,
      id: id,
    },
    include: {
      words: true,
      sharedUsers: true,
    },
  })
})
