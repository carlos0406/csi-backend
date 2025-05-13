import { z } from 'zod';

export const raritySchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
});

export type RaritySchema = z.infer<typeof raritySchema>;
