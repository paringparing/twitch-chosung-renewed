import { resolver } from "@blitzjs/rpc"
import db from "../../../../db"

export default resolver.pipe(
  resolver.authorize("ADMIN"),
  async (query: string): Promise<{ id: number; title: string; createdAt: Date }[]> => {
    return db.announcement.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
      where: {
        title: {
          contains: query,
        },
      },
    })
  }
)
