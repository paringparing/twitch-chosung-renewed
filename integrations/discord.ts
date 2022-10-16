import { User } from "@prisma/client"
import { WebhookClient, WebhookCreateMessageOptions } from "discord.js"

let webhook: WebhookClient | null =
  global.webhookClient ?? process.env.DISCORD_WEBHOOK_URL
    ? new WebhookClient({ url: process.env.DISCORD_WEBHOOK_URL! })
    : null

global.webhookClient = webhook

export const sendWebhook = (data: WebhookCreateMessageOptions, user: User) => {
  return webhook
    ?.send({
      username: getUsername(user),
      avatarURL: user.avatar!,
      ...data,
    })
    .catch(console.warn)
}

export const getUsername = (user: User) =>
  user.name === user.channel ? user.name : `${user.name}(${user.channel})`
