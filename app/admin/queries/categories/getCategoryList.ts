import db from "../../../../db"

export default async function getCategoryList(query: string) {
  console.log(query)
  return db.officialCategory.findMany({
    select: {
      id: true,
      name: true,
    },
  })
}
