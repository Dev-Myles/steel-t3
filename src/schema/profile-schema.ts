import z from 'zod';

export const cardSchema = z.object({
  creatorId: z.string(),
  likedBy: z.array(z.string()),
  name: z.string().max(32).min(2),
  private: z.boolean(),
});

export const profileSchema = z.object({
  userName: z.string().min(2).max(25),
  links: z.array(z.string()).max(9).optional(),
  private: z.boolean(),
  liked: z.array(z.string()).max(200),
  cards: z.array(cardSchema).optional(),
});

export const linksSchema = z.object({
  github: z.string().max(100).default('none'),
  company: z.string().max(100).default('none'),
  discord: z.string().max(100).default('none'),
  facebook: z.string().max(100).default('none'),
  instagram: z.string().max(100).default('none'),
  linkedin: z.string().max(100).default('none'),
  portfolio: z.string().max(100).default('none'),
  twitter: z.string().max(100).default('none'),
  youtube: z.string().max(100).default('none'),
});

export const linkUpdateSchema = z.object({
  profileId: z.string(),
  data: linksSchema,
});

export type LoginSchema = z.TypeOf<typeof profileSchema>;
export type CardSchema = z.TypeOf<typeof cardSchema>;
export type LinksSchema = z.TypeOf<typeof linksSchema>;
export type LinksUpdateSchema = z.TypeOf<typeof linkUpdateSchema>;
