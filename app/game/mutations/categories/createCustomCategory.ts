import { resolver } from "@blitzjs/rpc"
import schema from "../../validation/createCustomCategory"
import db from "../../../../db"
import { sendWebhook } from "integrations/discord"
import { Colors, EmbedBuilder } from "discord.js"

export default resolver.pipe(
  resolver.authorize(["USER", "ADMIN"]),
  resolver.zod(schema),
  async (i, { session }) => {
    const currentUser = await db.user.findFirst({
      where: {
        id: session.userId,
      },
    })

    if (!currentUser) return "User not found"

    const item = await db.customCategory.create({
      data: {
        name: i.name,
        description: i.description,
        difficulty: i.difficulty,
        ownerId: session.userId,
      },
    })

    await sendWebhook(
      {
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Blue)
            .setTitle("주제 추가됨")
            .addFields(
              {
                name: "ID",
                value: `${item.id}`,
                inline: true,
              },
              {
                name: "이름",
                value: item.name,
                inline: true,
              },
              {
                name: "난이도",
                value: `${item.difficulty}/10`,
                inline: true,
              }
            ),
        ],
      },
      currentUser
    )

    return item.id
  }
)
