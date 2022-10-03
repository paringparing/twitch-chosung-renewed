import { User } from "@prisma/client"
import { EmbedBuilder, WebhookClient, WebhookCreateMessageOptions } from "discord.js"

let webhook: WebhookClient =
  global.webhookClient ?? new WebhookClient({ url: process.env.DISCORD_WEBHOOK_URL! })

global.webhookClient = webhook

export const sendWebhook = (data: WebhookCreateMessageOptions, user: User) => {
  return webhook
    .send({
      username: user.name === user.channel ? user.name : `${user.name}(${user.channel})`,
      avatarURL: user.avatar!,
      ...data,
    })
    .catch(console.warn)
}
