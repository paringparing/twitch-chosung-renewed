import { z } from "zod"

export default z.object({
  id: z.number(),
  name: z.string().min(1),
  description: z.string().min(1),
  difficulty: z.number().int().min(1).max(10),
  visibility: z.literal("PUBLIC").or(z.literal("PRIVATE")),
  words: z.array(
    z.object({
      word: z.string().min(1),
      hint: z.string().min(1),
    })
  ),
})
