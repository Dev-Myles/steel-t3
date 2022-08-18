import z from 'zod';

export const accountSchema = z.object({
  name: z.string(),
  email: z.string(),
  imageSrc: z.string().url(),
});

export const linksSchema = z.object({
  Github: z.string(),
  Instagram: z.string(),
  Discord: z.string(),
  Facebook: z.string(),
  Portfolio: z.string(),
  Twitter: z.string(),
  Linkedin: z.string(),
  Youtube: z.string(),
  Company: z.string(),
});

export type AccountSchema = z.TypeOf<typeof accountSchema>;
export type LinksSchema = z.TypeOf<typeof linksSchema>;
