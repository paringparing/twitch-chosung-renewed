import { resolver } from "@blitzjs/rpc"
import addSharedUser from "../../validation/addSharedUser"
import db from "db"

export default resolver.pipe(
  resolver.authorize(["ADMIN", "USER"]),
  resolver.zod(addSharedUser),
  async (i, { session }) => {
    const item = await db.customCategory.findFirst({
      where: {
        id: i.id,
        ownerId: session.userId,
      },
      include: {
        sharedUsers: true,
      },
    })
    if (!item) return "Category not found"
    if (!item.sharedUsers.find((x) => x.userId === i.userId)) {
      return "User is not added"
    }
    await db.usersOnCustomCategories.delete({
      where: {
        categoryId_userId: {
          userId: i.userId,
          categoryId: i.id,
        },
      },
    })
    return null
  }
)
