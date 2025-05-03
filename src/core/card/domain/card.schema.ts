import { z } from 'zod';

export const yugiohcardSchema = z.object({
  id: z.number(),
  name: z.string(),
  card_sets: z.array(z.string()),
});

export type YuGiOhCardSchema = z.infer<typeof yugiohcardSchema>;
