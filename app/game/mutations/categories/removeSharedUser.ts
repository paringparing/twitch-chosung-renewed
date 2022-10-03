import { resolver } from "@blitzjs/rpc"
import addSharedUser from "../../validation/addSharedUser"
import db from "db"
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
    const partialUser = item.sharedUsers.find((x) => x.userId === i.userId)
    if (!partialUser) return "User is not added"
    const user = await db.user.findFirst({ where: { id: partialUser.userId } })

    if (!user) return "User not found"

    await db.usersOnCustomCategories.delete({
      where: {
        categoryId_userId: {
          userId: i.userId,
          categoryId: i.id,
        },
      },
    })

    await sendWebhook(
      {
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Blue)
            .setTitle("주제 공유 취소됨")
            .addFields(
              {
                name: "주제",
                value: `${item.name}`,
                inline: true,
              },
              {
                name: "공유 취소된 유저",
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
