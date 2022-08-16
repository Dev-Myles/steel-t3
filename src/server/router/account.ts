import { createProtectedRouter } from './protected-router';

export const accountRouter = createProtectedRouter()
  .query('get-profile', {
    async resolve({ ctx }) {
      const userId = ctx.session.user.id as string;
      try {
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
  .query('get-liked-cards', {
    async resolve({ ctx }) {
      const userId = ctx.session.user.id as string;
      try {
        const profile = await ctx.prisma?.profile.findUnique({
          where: {
            userId,
          },
        });
        if (profile?.liked.length) {
          const cardLikes = [...profile.liked];
          const likedCards = await ctx.prisma.card.findMany({
            where: {
              id: {
                in: cardLikes,
              },
            },
          });
          return likedCards;
        }
      } catch (error) {
        console.log(error);
      }
    },
  })
  .mutation('create-profile', {
    async resolve({ ctx }) {
      const userId = ctx.session.user.id as string;
      try {
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
