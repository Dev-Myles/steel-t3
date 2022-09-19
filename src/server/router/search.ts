import { searchSchema } from '../../schema/search-schema';
import { createRouter } from './context';

export const searchRouter = createRouter()
  .mutation('search-card', {
    input: searchSchema,
    async resolve({ ctx, input }) {
      try {
        const cards = await ctx.prisma.card.findMany({
          where: {
            name: {
              search: input.searchString,
            },
          },
        });
        await ctx.prisma.$disconnect();
        return cards;
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
            userName: {
              search: input.searchString,
            },
          },
        });
        await ctx.prisma.$disconnect();
        return profiles;
      } catch (error) {
        console.log(error);
      }
    },
  })
  .mutation('search-tags', {
    input: searchSchema,
    async resolve({ ctx, input }) {
      try {
        const cards = await ctx.prisma.card.findMany({
          where: {
            tags: {
              has: input.searchString,
            },
          },
        });
        await ctx.prisma.$disconnect();
        return cards;
      } catch (error) {
        console.log(error);
      }
    },
  });
