import { Client } from "tmi.js"
import { useCurrentUser } from "../../core/hooks/useCurrentUser"

let connected = false

export const tmi = (process.browser ? new Client({}) : null) as Client

export const useTmi = (): Client => {
  const user = useCurrentUser()!

  if (tmi.getChannels().includes(`#${user.channel}`)) {
    return tmi
  }

  throw (async () => {
    if (!connected) {
      await tmi.connect()
      connected = true
    }
    await tmi.join(user.channel!)
    console.log(`Connected to #${user.channel}`)
  })()
}
