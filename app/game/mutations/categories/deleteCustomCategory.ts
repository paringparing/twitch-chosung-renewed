import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Colors, EmbedBuilder } from "discord.js"
import { sendWebhook } from "integrations/discord"

export default resolver.pipe(
  resolver.authorize(["USER", "ADMIN"]),
  async (i: number, { session }) => {
    const currentUser = await db.user.findFirst({
      where: {
        id: session.userId,
      },
    })

    if (!currentUser) return "User not found"

    const item = await db.customCategory.findFirst({
      where: {
        id: i,
        ownerId: session.userId,
      },
    })
    if (!item) return "Category not found"
    await db.customCategory.delete({
      where: {
        id: item.id,
      },
    })

    await sendWebhook(
      {
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Blue)
            .setTitle("주제 삭제됨")
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

    return null
  }
)
