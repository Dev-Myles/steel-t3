import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email().max(50),
  password: z.string().min(8).max(30),
});

export type LoginSchema = z.TypeOf<typeof loginSchema>;
