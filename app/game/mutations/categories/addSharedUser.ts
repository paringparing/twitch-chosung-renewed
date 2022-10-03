import { resolver } from "@blitzjs/rpc"
import addSharedUser from "../../validation/addSharedUser"
import db from "../../../../db"
import { getUsername, sendWebhook } from "integrations/discord"
import { Colors, EmbedBuilder } from "discord.js"

export default resolver.pipe(
  resolver.authorize(["ADMIN", "USER"]),
  resolver.zod(addSharedUser),
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
      },
    })
    if (!item) return "Category not found"
    const user = await db.user.findUnique({
      where: { id: i.userId },
    })
    if (!user) return "User not found"
    if (item.sharedUsers.find((x) => x.userId === i.userId)) {
      return "User is already added"
    }
    if (item.ownerId === i.userId) {
      return "Cannot self share a category"
    }
    await db.customCategory.update({
      where: {
        id: i.id,
      },
      data: {
        sharedUsers: {
          create: {
            userId: user.id,
          },
        },
      },
    })

    await sendWebhook(
      {
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Blue)
            .setTitle("주제 공유됨")
            .addFields(
              {
                name: "주제",
                value: `${item.name}`,
                inline: true,
              },
              {
                name: "공유된 유저",
                value: `[${getUsername(user)}](https://twitch.tv/${user.channel})`,
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
