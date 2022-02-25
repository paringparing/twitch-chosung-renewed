import { resolver } from "blitz"
import db, { CustomCategoryVisibility } from "db"

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
      visibility: CustomCategoryVisibility.PUBLIC,
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
