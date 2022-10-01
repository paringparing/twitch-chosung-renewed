import { resolver } from "@blitzjs/rpc"
import { TLRU } from "tlru"
import axios from "axios"
import { getAppToken } from "../utils/getAppToken"

const cache = (global["liveStreamsCache"] as TLRU<"data", any[]>) ?? new TLRU({ maxAgeMs: 10000 })

export default resolver.pipe(async () => {
  if (cache.has("data")) return cache.get("data")
  const { data } = await axios.get(
    "https://api.twitch.tv/helix/streams?game_id=643686369&first=3",
    {
      headers: {
        "Client-Id": process.env.TWITCH_CLIENT_ID!,
        Accept: "application/vnd.twitchtv.v5+json",
        Authorization: `Bearer ${await getAppToken()}`,
      },
    }
  )
  console.log(data)
  cache.set("data", data.data)

  return data.data
})
