import z from 'zod';

export const accountSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  imageSrc: z.string().url().optional(),
});

export const linksSchema = z.object({
  Github: z.string().optional(),
  Instagram: z.string().optional(),
  Discord: z.string().optional(),
  Facebook: z.string().optional(),
  Portfolio: z.string().optional(),
  Twitter: z.string().optional(),
  Linkedin: z.string().optional(),
  Youtube: z.string().optional(),
  Company: z.string().optional(),
});

export type AccountSchema = z.TypeOf<typeof accountSchema>;
export type LinksSchema = z.TypeOf<typeof linksSchema>;
