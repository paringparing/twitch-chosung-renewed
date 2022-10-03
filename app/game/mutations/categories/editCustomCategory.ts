import { resolver } from "@blitzjs/rpc"
import editCustomCategory from "../../validation/editCustomCategory"
import db, { CustomCategory, CustomWord } from "../../../../db"
import { diffChars } from "diff"
import chalk from "chalk"
import { sendWebhook } from "integrations/discord"
import { codeBlock, Colors, EmbedBuilder } from "discord.js"
import * as yaml from "yaml"

const transformItem = (item: CustomCategory & { words: CustomWord[] }) => {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    difficulty: item.difficulty,
    visibility: item.visibility,
    words: item.words.length,
  }
}

export default resolver.pipe(
  resolver.authorize(["ADMIN", "USER"]),
  resolver.zod(editCustomCategory),
  async (i, { session }) => {
    const currentUser = await db.user.findFirst({
      where: {
        id: session.userId,
      },
    })

    if (!currentUser) return "User not found"

    const item = await db.customCategory.findFirst({
      where: {
        id: i.id,
        ownerId: session.userId,
      },
      include: {
        sharedUsers: true,
        words: true,
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
    const newItem = await db.customCategory.findFirstOrThrow({
      where: { id: item.id },
      include: { words: true },
    })

    const difference = diffChars(
      yaml.stringify(transformItem(item), null, 2),
      yaml.stringify(transformItem(newItem), null, 2)
    )

    if (difference.length === 1) return

    let str = ""

    for (const diff of difference) {
      const res = diff.added
        ? chalk.green(diff.value)
        : diff.removed
        ? chalk.red(diff.value)
        : diff.value
      str += res
    }

    await sendWebhook(
      {
        embeds: [
          new EmbedBuilder()
            .setTitle("주제 수정됨")
            .setColor(Colors.Blue)
            .setDescription(`주제: ${newItem.name}\n${codeBlock("ansi", str)}`),
        ],
      },
      currentUser
    )
  }
)
