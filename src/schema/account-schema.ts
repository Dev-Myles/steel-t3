import z from 'zod';

export const accountSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  imageSrc: z.string().url().optional(),
});

export type AccountSchema = z.TypeOf<typeof accountSchema>;
