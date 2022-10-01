import { resolver } from "@blitzjs/rpc"
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
      categories: (
        await db.customCategory.findMany({
          where,
          select: {
            name: true,
            id: true,
            description: true,
            difficulty: true,
            owner: true,
          },
          skip: page * 6,
          take: 6,
        })
      ).map((x) => ({
        id: x.id,
        name: x.name,
        description: x.description,
        difficulty: x.difficulty,
        owner: x.owner.name,
      })),
      count: await db.customCategory.count({ where }),
    }
  }
)
