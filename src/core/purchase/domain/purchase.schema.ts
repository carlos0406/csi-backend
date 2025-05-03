import { z } from 'zod';

export const purchaseInputSchema = z.object({
  name: z.string().max(255),
  startDate: z.preprocess(
    (arg) => (typeof arg === 'string' ? new Date(arg) : arg),
    z.date(),
  ),
  endDate: z.preprocess(
    (arg) => (typeof arg === 'string' ? new Date(arg) : arg),
    z.date(),
  ),
});

export type PurchaseInputSchema = z.infer<typeof purchaseInputSchema>;

export const purchaseOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type PurchaseOutputSchema = z.infer<typeof purchaseOutputSchema>;
