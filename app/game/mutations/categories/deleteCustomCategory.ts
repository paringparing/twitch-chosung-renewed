import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(
  resolver.authorize(["USER", "ADMIN"]),
  async (i: number, { session }) => {
    const item = await db.customCategory.findFirst({
      where: {
        id: i,
        ownerId: session.userId,
      },
    })
    if (!item) return "Category not found"
    await db.customCategory.delete({
      where: {
        id: item.id,
      },
    })
    return null
  }
)
