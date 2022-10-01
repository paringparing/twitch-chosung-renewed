import { resolver } from "@blitzjs/rpc"
import db from "../../db"

export default resolver.pipe(async () => {
  // return db.customCategory.findMany({
  //   include: {
  //     owner: true
  //   },
  // })

  const categoryIds = (
    (await db.$queryRaw`select id from "CustomCategory" where visibility = 'PUBLIC'::"CustomCategoryVisibility" order by random() limit 100;`) as {
      id: number
    }[]
  ).map((x) => x.id)

  const categories = await db.customCategory.findMany({
    where: {
      id: {
        in: categoryIds,
      },
    },
    select: {
      owner: {
        select: {
          name: true,
          avatar: true,
        },
      },
      id: true,
      name: true,
    },
  })

  return categories
})
