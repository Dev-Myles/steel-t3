import z from 'zod';
import { likeSchema } from '../../schema/like-schema';
import { createRouter } from './context';

export const cardRouter = createRouter()
  .query('get-card', {
    input: z.string(),
    async resolve({ ctx, input }) {
      try {
        const card = await ctx.prisma.card.findUnique({
          where: {
            id: input,
          },
        });
        await ctx.prisma.$disconnect();
        return card;
      } catch (error) {
        console.log(error);
      }
    },
  })
  .mutation('like-card', {
    input: likeSchema,
    async resolve({ ctx, input }) {
      const userId = ctx?.session?.user?.id as string;
      try {
        if (userId) {
          const userLiked = input.liked;
          const usersLiked = await ctx.prisma?.profile.findUnique({
            where: {
              userId,
            },
            select: {
              id: true,
              liked: true,
            },
          });
          const cardLiked = await ctx.prisma?.card.findUnique({
            where: {
              id: input.cardId,
            },
            select: {
              likedBy: true,
            },
          });

          if (userLiked && usersLiked && cardLiked) {
            const filteredUserLikes = usersLiked.liked.filter(
              (like) => like !== input.cardId
            );
            const filteredCardLikes = cardLiked.likedBy.filter(
              (user) => user !== usersLiked?.id
            );

            await ctx.prisma?.profile.update({
              where: {
                userId,
              },
              data: {
                liked: filteredUserLikes,
              },
            });

            await ctx.prisma?.card.update({
              where: {
                id: input.cardId,
              },
              data: {
                likedBy: filteredCardLikes,
              },
            });
            await ctx.prisma.$disconnect();
          } else {
            if (usersLiked && cardLiked) {
              await ctx.prisma?.profile.update({
                where: {
                  userId,
                },
                data: {
                  liked: [...usersLiked.liked, input.cardId],
                },
              });

              await ctx.prisma?.card.update({
                where: {
                  id: input.cardId,
                },
                data: {
                  likedBy: [...cardLiked.likedBy, usersLiked.id],
                },
              });
              await ctx.prisma.$disconnect();
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

export default cardRouter;
