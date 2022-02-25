import { BlitzApiHandler } from "next"
import { getSession } from "blitz"

export default (async (req, res) => {
  const session = await getSession(req, res)

  await session.$revoke()

  res.redirect("/")
}) as BlitzApiHandler
