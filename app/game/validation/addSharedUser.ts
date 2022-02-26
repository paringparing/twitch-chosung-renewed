import { z } from "zod"

export default z.object({
  id: z.number().int(),
  userId: z.string(),
})
