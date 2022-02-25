import db from "../../../../db"
import { resolver } from "blitz"

export default resolver.pipe(
  resolver.authorize("ADMIN"),
  async (query: string): Promise<{ id: number; name: string; description: string }[]> => {
    return db.officialCategory.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
      where: {
        name: {
          contains: query,
        },
      },
    })
  }
)
