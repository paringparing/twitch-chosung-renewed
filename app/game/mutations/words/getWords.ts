import { resolver } from "blitz"
import { z } from "zod"
import db from "../../../../db"

const schema = z.object({
  custom: z.array(z.number().int()),
  official: z.array(z.number().int()),
})

export default resolver.pipe(
  resolver.authorize(["ADMIN", "USER"]),
  resolver.zod(schema),
  async (i, { session }) => {
    const official = (
      await db.officialWord.findMany({
        where: {
          categoryId: {
            in: i.official,
          },
        },
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
      })
    ).map((x) => ({
      word: x.word,
      hint: x.hint,
      category: x.category.name,
    }))
    const custom = (
      await db.customWord.findMany({
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
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
      })
    ).map((x) => ({
      word: x.word,
      hint: x.hint,
      category: x.category.name,
    }))
    return [...official, ...custom]
  }
)
