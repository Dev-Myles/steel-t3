import z from 'zod';

export const searchSchema = z.object({
  filterTypes: z.string(),
  searchString: z.string().max(32).min(2),
});

export type SearchSchema = z.TypeOf<typeof searchSchema>;
