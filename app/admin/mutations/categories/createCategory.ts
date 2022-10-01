import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "../../../../db"

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
})

export default resolver.pipe(resolver.authorize("ADMIN"), resolver.zod(schema), async (data) => {
  const category = await db.officialCategory.create({
    select: {
      id: true,
    },
    data: {
      name: data.title,
      description: data.description,
    },
  })
  return category.id
})
