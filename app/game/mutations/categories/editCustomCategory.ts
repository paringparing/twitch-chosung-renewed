import { resolver } from "blitz"
import editCustomCategory from "../../validation/editCustomCategory"
import db from "../../../../db"

export default resolver.pipe(
  resolver.authorize(["ADMIN", "USER"]),
  resolver.zod(editCustomCategory),
  async (i, { session }) => {
    const item = await db.customCategory.findFirst({
      where: {
        id: i.id,
        ownerId: session.userId,
      },
      include: {
        sharedUsers: true,
      },
    })
    if (!item) return "Item not found"
    console.log(i, item)
    await db.customCategory.update({
      where: {
        id: item.id,
      },
      data: {
        name: i.name,
        description: i.description,
        visibility: i.visibility,
        difficulty: i.difficulty,
        words: {
          upsert: i.words.map((x) => ({
            where: {
              categoryId_word: {
                categoryId: item.id,
                word: x.word,
              },
            },
            create: {
              word: x.word,
              hint: x.hint,
            },
            update: {
              word: x.word,
              hint: x.hint,
            },
          })),
        },
      },
    })
    await db.customWord.deleteMany({
      where: {
        categoryId: item.id,
        word: {
          notIn: i.words.map((x) => x.word),
        },
      },
    })
  }
)
