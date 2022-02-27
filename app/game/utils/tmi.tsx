import { Client } from "tmi.js"
import { useCurrentUser } from "../../core/hooks/useCurrentUser"

let tmi: Client

export const useTmi = (): Client => {
  const user = useCurrentUser()!

  if (tmi) {
    return tmi
  }

  throw (async () => {
    tmi = new Client({ channels: [user.channel] })

    tmi.on("join", (channel) => console.log(`Connected to ${channel}`))

    await tmi.connect()
  })()
}
