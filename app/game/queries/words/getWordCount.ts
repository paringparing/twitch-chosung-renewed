import { z } from "zod"
import { resolver } from "blitz"
import db from "../../../../db"

const schema = z.object({
  custom: z.array(z.number().int()),
  official: z.array(z.number().int()),
})

export default resolver.pipe(
  resolver.authorize(["USER", "ADMIN"]),
  resolver.zod(schema),
  async (i, { session }) => {
    const officialCount = await db.officialWord.count({
      where: {
        categoryId: {
          in: i.official,
        },
      },
    })
    const customCount = await db.customWord.count({
      where: {
        categoryId: {
          in: i.custom,
        },
        OR: [
          {
            category: {
              OR: [
                {
                  visibility: "PUBLIC",
                },
                {
                  sharedUsers: {
                    some: {
                      userId: session.userId,
                    },
                  },
                },
                {
                  ownerId: session.userId,
                },
              ],
            },
          },
        ],
      },
    })
    return officialCount + customCount
  }
)
