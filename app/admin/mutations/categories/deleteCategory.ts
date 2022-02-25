import { NotFoundError, resolver } from "blitz"
import db from "db"

export default resolver.pipe(resolver.authorize("ADMIN"), async (i: number, c) => {
  const item = await db.officialCategory.findUnique({ where: { id: i } })
  if (!item) throw new NotFoundError()
  await db.officialCategory.delete({
    where: {
      id: i,
    },
  })
})
