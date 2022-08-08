import z from 'zod';

export const createUserSchema = z.object({
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
  email: z.string().email().max(50),
  password: z.string().min(8).max(30),
  confirmPassword: z.string().min(8).max(30),
});

export const createUserDataSchema = z.object({
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
  email: z.string().email().max(50),
  password: z.string().min(8).max(30),
});

export type CreateUserSchema = z.TypeOf<typeof createUserSchema>;
export type CreateUserDataSchema = z.TypeOf<typeof createUserDataSchema>;
export type NodemailerData = Pick<CreateUserDataSchema, 'email' | 'firstName'>;
