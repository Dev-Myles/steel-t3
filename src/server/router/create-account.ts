import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as trpc from '@trpc/server';
import { loginSchema } from '../../schema/login-schema';
import { createUserDataSchema } from '../../schema/user-schema';
import { createRouter } from './context';

export const userRouter = createRouter()
  .mutation('create-account', {
    input: createUserDataSchema,
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.user.create({
          data: {
            ...input,
          },
        });
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code == 'P2002') {
            throw new trpc.TRPCError({
              code: 'CONFLICT',
              message: 'User already exists.',
            });
          }
        }
        console.log(error);
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Oops something went wrong.',
        });
      }
    },
  })
  .mutation('login', {
    input: loginSchema,
    async resolve({ ctx, input }) {
      try {
        console.log(input);
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code == 'P1000') {
            throw new trpc.TRPCError({
              code: 'BAD_REQUEST',
              message: 'Login failed, Authentication server error.',
            });
          }
        }
        console.log(error);
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Oops something went wrong.',
        });
      }
    },
  });
