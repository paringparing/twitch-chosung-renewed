import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Colors, EmbedBuilder } from "discord.js"
import { sendWebhook } from "integrations/discord"

export default resolver.pipe(resolver.authorize(["ADMIN", "USER"]), async (_data, { session }) => {
  const currentUser = await db.user.findFirst({
    where: {
      id: session.userId,
    },
  })

  if (!currentUser) return "User not found"

  await sendWebhook(
    {
      embeds: [
        new EmbedBuilder()
          .setTitle("게임 시작")
          .setColor(Colors.Blue)
          .setDescription(
            `채널: [${currentUser.channel}](https://twitch.tv/${currentUser.channel})`
          ),
      ],
    },
    currentUser
  )
})
