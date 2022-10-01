import { resolver } from "@blitzjs/rpc"
import addSharedUser from "../../validation/addSharedUser"
import db from "../../../../db"

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
    const user = await db.user.findUnique({
      where: { id: i.userId },
    })
    if (!user) return "User not found"
    if (item.sharedUsers.find((x) => x.userId === i.userId)) {
      return "User is already added"
    }
    if (item.ownerId === i.userId) {
      return "Cannot self share a category"
    }
    await db.customCategory.update({
      where: {
        id: i.id,
      },
      data: {
        sharedUsers: {
          create: {
            userId: user.id,
          },
        },
      },
    })
    return null
  }
)
