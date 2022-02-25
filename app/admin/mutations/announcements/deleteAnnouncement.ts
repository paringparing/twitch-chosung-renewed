import { NotFoundError, resolver } from "blitz"
import db from "../../../../db"

export default resolver.pipe(resolver.authorize("ADMIN"), async (i: number) => {
  const item = await db.announcement.findUnique({ where: { id: i } })
  if (!item) throw new NotFoundError()
  await db.announcement.delete({ where: { id: i } })
})
