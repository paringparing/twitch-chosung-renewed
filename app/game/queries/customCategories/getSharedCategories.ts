import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(
  resolver.authorize(["ADMIN", "USER"]),
  async ({ query, page }: { query: string; page: number }, { session }) => {
    const where = {
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
      sharedUsers: {
        some: {
          userId: session.userId,
        },
      },
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
