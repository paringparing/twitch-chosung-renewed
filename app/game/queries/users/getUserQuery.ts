import { resolver } from "@blitzjs/rpc"
import db from "../../../../db"

export default resolver.pipe(resolver.authorize(["USER", "ADMIN"]), async (i: string, c) => {
  return db.user.findFirst({
    where: {
      id: i ?? undefined,
    },
  })
})
