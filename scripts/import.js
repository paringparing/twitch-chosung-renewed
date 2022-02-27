require("dotenv").config({ path: ".env.local" })

const { PrismaClient } = require("@prisma/client")

const suggested = require("../suggest.json")

/**
 * @type {import('@prisma/client').PrismaClient}
 */
const db = new PrismaClient()

;(async () => {
  for (const category of suggested) {
    await db.officialCategory.create({
      data: {
        name: category.title,
        description: category.description,
        difficulty: category.difficulty,
        words: {
          create: category.words.map((x) => ({
            word: x.word,
            hint: x.hint,
          })),
        },
      },
    })
  }
})()
