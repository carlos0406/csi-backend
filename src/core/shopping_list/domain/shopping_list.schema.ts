import { z } from 'zod';

export const shoppingListInputSchema = z.object({
  userId: z.string().uuid(),
  purchaseId: z.string().uuid(),
  items: z
    .array(
      z.object({
        cardId: z.number(),
        rarityId: z.string().max(50),
        quantity: z.number(),
        collection: z.string().max(100),
        unit_price: z.number().int().positive(),
      }),
    )
    .optional(),
});

export type ShoppingListInput = z.infer<typeof shoppingListInputSchema>;

export const shoppingListOutputSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  purchaseId: z.string().uuid(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  items: z
    .array(
      z.object({
        id: z.string().uuid(),
        cardId: z.number(),
        rarity: z.object({
          id: z.string().max(50),
          name: z.string().max(50),
        }),
        quantity: z.number(),
        collection: z.string().max(100),
      }),
    )
    .optional(),
});
