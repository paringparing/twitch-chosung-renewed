import axios from "axios"

let expiresAt: Date

let token: string

export const getAppToken = async (): Promise<string> => {
  if (token && expiresAt && expiresAt.getTime() > Date.now()) {
    return token
  }

  const params = new URLSearchParams()

  params.append("client_id", process.env.TWITCH_CLIENT_ID!)
  params.append("client_secret", process.env.TWITCH_CLIENT_SECRET!)
  params.append("grant_type", "client_credentials")
  params.append("scope", "")

  const { data } = await axios.post(`https://id.twitch.tv/oauth2/token?${params}`)
  expiresAt = new Date(Date.now() + data.expires_in * 1000)
  token = data.access_token
  return token
}
