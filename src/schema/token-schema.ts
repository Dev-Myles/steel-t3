import z from 'zod';

export const tokenSchema = z.object({
  token: z.string(),
});

export const jwtPayloadSchema = z.object({
  usersId: z.string(),
  iat: z.number(),
  exp: z.number(),
});

export type TokenSchema = z.TypeOf<typeof tokenSchema>;
export type JwtPayloadSchema = z.TypeOf<typeof jwtPayloadSchema>;
