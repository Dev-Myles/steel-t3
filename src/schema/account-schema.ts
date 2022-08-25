import z from 'zod';

export const accountSchema = z.object({
  name: z.string(),
  email: z.string(),
  imageSrc: z.string().url(),
});

export type AccountSchema = z.TypeOf<typeof accountSchema>;
