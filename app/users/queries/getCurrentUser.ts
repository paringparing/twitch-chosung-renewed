import { Ctx } from "blitz"
import db from "db"

export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  return db.user.findFirst({
    where: { id: session.userId },
    select: { id: true, name: true, channel: true, role: true },
  })
}
