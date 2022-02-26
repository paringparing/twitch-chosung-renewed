import { NotFoundError, resolver } from "blitz"
import { z } from "zod"
import db from "db"

const schema = z.object({
  id: z.number(),
  name: z.string().min(1),
  description: z.string().min(1),
  available: z.boolean(),
  difficulty: z.number().int().min(1).max(10),
  words: z.array(
    z.object({
      word: z.string().min(1),
      hint: z.string().min(1),
      id: z.number().or(z.undefined()),
    })
  ),
})

export default resolver.pipe(resolver.authorize("ADMIN"), resolver.zod(schema), async (i, c) => {
  const item = await db.officialCategory.findUnique({ where: { id: i.id } })
  if (!item) throw new NotFoundError()
  await db.officialCategory.update({
    where: { id: i.id },
    data: {
      name: i.name,
      description: i.description,
      available: i.available,
      difficulty: i.difficulty,
      words: {
        upsert: i.words.map((x) => ({
          where: {
            categoryId_word: {
              categoryId: item.id,
              word: x.word,
            },
          },
          update: {
            word: x.word,
            hint: x.hint,
          },
          create: {
            word: x.word,
            hint: x.hint,
          },
        })),
      },
    },
  })
  console.log(
    await db.officialWord.deleteMany({
      where: {
        categoryId: item.id,
        word: {
          notIn: i.words.map((x) => x.word),
        },
      },
    })
  )
})
