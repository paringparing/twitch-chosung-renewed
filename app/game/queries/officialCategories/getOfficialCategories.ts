import { resolver } from "blitz"
import db from "../../../../db"

export default resolver.pipe(
  resolver.authorize(["ADMIN", "USER"]),
  async ({
    query,
    page,
  }: {
    query: string
    page: number
  }): Promise<{
    categories: { name: string; id: number; description: string; difficulty: number }[]
    count: number
  }> => {
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
      available: true,
    }
    return {
      categories: await db.officialCategory.findMany({
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
      count: await db.officialCategory.count({ where }),
    }
  }
)
