import { resolver } from "@blitzjs/rpc"
import db from "db"

export default resolver.pipe(
  resolver.authorize(["ADMIN", "USER"]),
  async ({ query, page }: { query: string; page: number }, { session }) => {
    const where = {
      ownerId: session.userId,
      OR: [
        {
          name: {
            contains: query,
          },
        },
        {
          description: {
            contains: query,
          },
        },
      ],
    }
    return {
      categories: await db.customCategory.findMany({
        where,
        select: {
          name: true,
          id: true,
          description: true,
          difficulty: true,
        },
        skip: page * 6,
        take: 6,
      }),
      count: await db.customCategory.count({ where }),
    }
  }
)
