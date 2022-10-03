import { getSession } from "@blitzjs/auth"
import { NextApiHandler } from "next"
import axios from "axios"
import db from "../../../db"
import { Role } from "../../../types"
import { sendWebhook } from "integrations/discord"
import { Colors, EmbedBuilder } from "discord.js"

type TwitchUser = {
  id: string
  login: string
  display_name: string
  profile_image_url: string
}

export default (async (req, res) => {
  if (!req.query.code) {
    const params = new URLSearchParams()

    params.append("client_id", process.env.TWITCH_CLIENT_ID!)

    params.append("redirect_uri", process.env.TWITCH_REDIRECT_URI!)

    params.append("response_type", "code")

    const url = "https://id.twitch.tv/oauth2/authorize?" + params.toString()
    res.redirect(url)
  } else {
    const params = new URLSearchParams()
    params.append("client_id", process.env.TWITCH_CLIENT_ID!)
    params.append("client_secret", process.env.TWITCH_CLIENT_SECRET!)
    params.append("redirect_uri", process.env.TWITCH_REDIRECT_URI!)
    params.append("code", req.query.code as string)
    params.append("grant_type", "authorization_code")
    const { data, res: resp } = (await axios
      .post<{ access_token: string }>("https://id.twitch.tv/oauth2/token", params)
      .catch((e) => ({ data: null, res: e.response }))) as unknown as {
      data: { access_token: string }
      res: any
    }
    if (!data) {
      console.error(resp.data)
      return res.json({ error: "Failed to get token" })
    }
    const userData = (await axios
      .get("https://api.twitch.tv/helix/users", {
        headers: {
          "Client-ID": process.env.TWITCH_CLIENT_ID!,
          Authorization: `Bearer ${data.access_token}`,
        },
      })
      .then((r) => r.data.data[0])
      .catch(() => null)) as TwitchUser | null

    if (!userData) {
      return res.json({ error: "Failed to fetch user info" })
    }
    const user = await db.user.upsert({
      where: {
        id: userData.id,
      },
      create: {
        id: userData.id,
        name: userData.display_name,
        channel: userData.login,
        avatar: userData.profile_image_url,
      },
      update: {
        name: userData.display_name,
        channel: userData.login,
        avatar: userData.profile_image_url,
      },
    })

    const session = await getSession(req, res)
    await session.$create({
      userId: user.id,
      role: user.role as Role,
    })

    await sendWebhook(
      {
        embeds: [
          new EmbedBuilder()
            .setTitle("새로운 로그인 감지됨")
            .addFields(
              {
                name: "ID",
                value: user.id,
                inline: true,
              },
              {
                name: "이름",
                value: user.name === user.channel ? user.name : `${user.name}(${user.channel})`,
                inline: true,
              },
              {
                name: "IP",
                value: req.socket.remoteAddress ?? "Unknown",
                inline: true,
              }
            )
            .setURL(`https://twitch.tv/${user.channel}`)
            .setColor(Colors.Blue),
        ],
      },
      user
    )

    res.redirect("/game")
  }
}) as NextApiHandler
