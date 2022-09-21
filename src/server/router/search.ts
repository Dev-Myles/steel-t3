import { Card } from '@prisma/client';
import { searchSchema } from '../../schema/search-schema';
import { createRouter } from './context';

export const searchRouter = createRouter()
  .mutation('search-card', {
    input: searchSchema,
    async resolve({ ctx, input }) {
      try {
        const cards: Card[] = await ctx.prisma.card.findMany({
          where: {
            private: false,
          },
        });
        const filteredCards = cards?.filter((card) =>
          card.name.includes(input.searchString)
        );

        const message = !filteredCards.length ? 'No cards found.' : null;
        await ctx.prisma.$disconnect();
        return { cardData: filteredCards, message };
      } catch (error) {
        console.log(error);
      }
    },
  })
  .mutation('search-profile', {
    input: searchSchema,
    async resolve({ ctx, input }) {
      try {
        const profiles = await ctx.prisma.profile.findMany({
          where: {
            private: false,
          },
          include: {
            cards: true,
            links: true,
            user: {
              select: {
                image: true,
              },
            },
          },
        });
        const filteredProfiles = profiles.filter((profile) =>
          profile.userName.includes(input.searchString)
        );
        const message = filteredProfiles.length ? null : 'No profiles found.';

        await ctx.prisma.$disconnect();
        return { profileData: filteredProfiles, message };
      } catch (error) {
        console.log(error);
      }
    },
  })
  .mutation('search-tags', {
    input: searchSchema,
    async resolve({ ctx, input }) {
      try {
        const cards: Card[] = await ctx.prisma.card.findMany({
          where: {
            private: false,
          },
        });
        const filteredCards = cards.filter(
          (card) => card.tags.includes(input.searchString) === true
        );
        const message = filteredCards.length ? null : 'No tags found.';
        await ctx.prisma.$disconnect();
        return { cardData: filteredCards, message };
      } catch (error) {
        console.log(error);
      }
    },
  })
  .query('get-profile-id', {
    async resolve({ ctx }) {
      try {
        if (!ctx.session?.user?.id) {
          return null;
        } else {
          const userId = ctx.session.user.id as string;
          const profileId = await ctx.prisma?.profile.findUnique({
            where: {
              userId,
            },
            select: {
              id: true,
              userName: true,
            },
          });
          await ctx.prisma.$disconnect();
          if (profileId) {
            return profileId;
          } else {
            return null;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
