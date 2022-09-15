import z from 'zod';
import { createCardDataSchema } from '../../schema/create-card-schema';
import { likeSchema } from '../../schema/like-schema';
import { createRouter } from './context';

export const cardRouter = createRouter()
  .mutation('create-card', {
    input: createCardDataSchema,
    async resolve({ ctx, input }) {
      try {
        const newCard = await ctx.prisma.card.create({
          data: {
            creatorId: input.creatorId,
            description: input.description,
            private: input.private,
            name: input.name,
            projectType: input.projectType,
            level: input.level,
            openSource: input.openSource,
            uses: input.uses,
            tags: input.tags,
          },
        });
        const newLinks = await ctx.prisma.cardLinks.create({
          data: {
            cardId: newCard.id,
            github: input.links.github,
            website: input.links.website,
          },
        });
        await ctx.prisma.$disconnect();
        return newCard.id;
      } catch (error) {
        console.log(error);
      }
    },
  })
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
