import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "../../../../db"

const schema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
})

export default resolver.pipe(resolver.authorize("ADMIN"), resolver.zod(schema), async (i) => {
  const item = await db.announcement.create({
    data: {
      title: i.title,
      content: i.content,
    },
    select: {
      id: true,
    },
  })

  return item.id
})
