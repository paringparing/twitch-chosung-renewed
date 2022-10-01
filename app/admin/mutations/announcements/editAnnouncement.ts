import { resolver } from "@blitzjs/rpc"
import { NotFoundError } from "blitz"
import { z } from "zod"
import db from "../../../../db"

const schema = z.object({
  id: z.number(),
  title: z.string().min(1),
  content: z.string().min(1),
})

export default resolver.pipe(resolver.authorize("ADMIN"), resolver.zod(schema), async (i) => {
  const item = await db.announcement.findUnique({ where: { id: i.id } })
  if (!item) throw new NotFoundError()
  await db.announcement.update({
    where: {
      id: i.id,
    },
    data: {
      title: i.title,
      content: i.content,
    },
  })
})
