import z from 'zod';

export const likeSchema = z.object({
  liked: z.boolean(),
  cardId: z.string(),
});

export type LikeSchema = z.TypeOf<typeof likeSchema>;
