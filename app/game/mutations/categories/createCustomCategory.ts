import { resolver } from "@blitzjs/rpc"
import schema from "../../validation/createCustomCategory"
import db from "../../../../db"

export default resolver.pipe(
  resolver.authorize(["USER", "ADMIN"]),
  resolver.zod(schema),
  async (i, { session }) => {
    const item = await db.customCategory.create({
      data: {
        name: i.name,
        description: i.description,
        difficulty: i.difficulty,
        ownerId: session.userId,
      },
    })

    return item.id
  }
)
