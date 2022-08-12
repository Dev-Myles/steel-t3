import z from 'zod';
import { createRouter } from './context';

export const accountRouter = createRouter()
  .query('get-profile', {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      try {
        const { userId } = input;
        const profile = await ctx.prisma?.profile.findUnique({
          where: {
            userId,
          },
          include: {
            links: true,
            cards: true,
          },
        });
        return profile;
      } catch (error) {
        console.log(error);
      }
    },
  })
  .mutation('create-profile', {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      try {
        const { userId } = input;
        const newProfile = await ctx.prisma?.profile
          .create({
            data: {
              userId,
            },
          })
          .then(async (profile) => {
            const profileId = profile?.id;
            await ctx.prisma?.links.create({
              data: {
                profileId,
              },
            });
          });
      } catch (error) {
        console.log(error);
      }
    },
  });
