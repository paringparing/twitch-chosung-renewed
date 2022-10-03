import { z } from "zod"

export default z.object({
  name: z.string().min(1).max(32),
  description: z.string().min(1).max(256),
  difficulty: z.number().int().min(1).max(10),
})
