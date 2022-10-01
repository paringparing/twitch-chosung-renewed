import { getSession } from "@blitzjs/auth"
import { NextApiHandler } from "next"

export default (async (req, res) => {
  const session = await getSession(req, res)

  await session.$revoke()

  res.redirect("/")
}) as NextApiHandler
