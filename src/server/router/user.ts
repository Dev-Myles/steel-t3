import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as trpc from '@trpc/server';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { loginSchema } from '../../schema/login-schema';
import { tokenSchema } from '../../schema/token-schema';
import { createUserDataSchema } from '../../schema/user-schema';
import { encryptPassword } from '../../utils/crypto/password-hashing';
import sendMail from '../../utils/nodemailer/nodemailer';
import { createRouter } from './context';

export const userRouter = createRouter()
  .mutation('create-account', {
    input: createUserDataSchema,
    async resolve({ ctx, input }) {
      try {
        const { password } = input;
        const userInfo = {
          ...input,
          password: await encryptPassword(password),
        };

        const newUser = await ctx.prisma.user.create({
          data: {
            ...userInfo,
          },
        });
        sendMail(input, newUser.id);
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
  //Finish a working login in route.
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
  })
  .mutation('email-confirmed', {
    input: tokenSchema,
    async resolve({ ctx, input }) {
      try {
        const { token } = input;
        const item: any = jwt.verify(
          token,
          process.env.NODEMAILER_SECRET as string
        );
        const { userId } = item;
        const now: Date = new Date();

        if (userId) {
          await ctx.prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              emailVerified: now,
            },
          });
        }
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code == ' P2006') {
            throw new trpc.TRPCError({
              code: 'BAD_REQUEST',
              message:
                '"The provided value userId for user field userId is not valid.',
            });
          }
        }

        if (error instanceof JsonWebTokenError) {
          throw new trpc.TRPCError({
            code: 'BAD_REQUEST',
            message: `Error: ${error.message}`,
          });
        }
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Oops something went wrong.',
        });
      }
    },
  });
