import z from 'zod';

export const cardSchema = z.object({
  creatorId: z.string(),
  likedBy: z.array(z.string()),
  name: z.string().max(32).min(2),
  private: z.boolean(),
});

export const profileSchema = z.object({
  userName: z.string().min(2).max(25),
  links: z.array(z.string().url()).max(9).optional(),
  private: z.boolean(),
  liked: z.array(z.string()).max(200),
  cards: z.array(cardSchema).optional(),
});

export type LoginSchema = z.TypeOf<typeof profileSchema>;
export type CardSchema = z.TypeOf<typeof cardSchema>;
