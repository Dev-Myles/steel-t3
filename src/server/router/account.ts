import z from 'zod';
import { editCardDataSchema } from '../../schema/create-card-schema';
import { LinksSchema, linkUpdateSchema } from '../../schema/profile-schema';
import { userNameSchema } from '../../schema/user-schema';
import { createProtectedRouter } from './protected-router';

export const accountRouter = createProtectedRouter()
  .query('get-profile-id', {
    async resolve({ ctx }) {
      try {
        if (!ctx.session.user.id) {
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
  })
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
            cards: {
              include: {
                links: true,
              },
            },
          },
        });

        if (!profile) {
          const profile = await ctx.prisma?.profile
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
          await ctx.prisma.$disconnect();
          return profile;
        } else {
          await ctx.prisma.$disconnect();

          return profile;
        }
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
            include: {
              links: true,
            },
          });
          await ctx.prisma.$disconnect();

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
        const userProfile = await ctx.prisma.profile.findUnique({
          where: {
            userId,
          },
        });
        if (!userProfile) {
          await ctx.prisma?.profile
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
              await ctx.prisma.$disconnect();
            });
        } else {
          null;
        }
      } catch (error) {
        console.log(error);
      }
    },
  })
  .mutation('profile-visability', {
    input: z.boolean(),
    async resolve({ ctx, input }) {
      const userId = ctx.session.user.id as string;
      try {
        await ctx.prisma?.profile.update({
          where: {
            userId,
          },
          data: {
            private: input,
          },
        });
        await ctx.prisma.$disconnect();
      } catch (error) {
        console.log(error);
      }
    },
  })
  .mutation('change-username', {
    input: userNameSchema,
    async resolve({ ctx, input }) {
      const userId = ctx.session.user.id as string;
      try {
        await ctx.prisma.profile.update({
          where: {
            userId,
          },
          data: {
            userName: input.userName,
          },
        });
        await ctx.prisma.$disconnect();
      } catch (error) {
        console.log(error);
      }
    },
  })
  .mutation('edit-links', {
    input: linkUpdateSchema,
    async resolve({ ctx, input }) {
      const profileId = input.profileId;
      const data = input.data;
      const links: LinksSchema = {
        github: data.github.length ? data.github : 'none',
        company: data.company.length ? data.company : 'none',
        discord: data.discord.length ? data.discord : 'none',
        facebook: data.facebook.length ? data.facebook : 'none',
        instagram: data.instagram.length ? data.instagram : 'none',
        linkedin: data.linkedin.length ? data.linkedin : 'none',
        portfolio: data.portfolio.length ? data.portfolio : 'none',
        twitter: data.twitter.length ? data.twitter : 'none',
        youtube: data.youtube.length ? data.youtube : 'none',
      };
      try {
        await ctx.prisma.links.update({
          where: {
            profileId,
          },
          data: {
            ...links,
          },
        });
        await ctx.prisma.$disconnect();
      } catch (error) {
        console.log(error);
      }
    },
  })
  .mutation('delete-card', {
    input: z.string(),
    async resolve({ ctx, input }) {
      const id = input;
      try {
        await ctx.prisma.card.delete({
          where: {
            id,
          },
        });
        await ctx.prisma.$disconnect();
      } catch (error) {
        console.log(error);
      }
    },
  })
  .mutation('edit-card', {
    input: editCardDataSchema,
    async resolve({ ctx, input }) {
      const {
        name,
        description,
        private: privateStatus,
        tags,
        openSource,
        projectType,
        level,
        links,
        uses,
      } = input;
      try {
        const id = input.id;
        const updatedCard = await ctx.prisma.card.update({
          where: {
            id,
          },
          data: {
            name,
            description,
            private: privateStatus,
            tags,
            openSource,
            projectType,
            level,
            uses,
          },
        });
        const updatedLinks = await ctx.prisma.cardLinks.update({
          where: {
            cardId: id,
          },
          data: {
            github: links.github,
            website: links.website,
          },
        });
        await ctx.prisma.$disconnect();
        return id;
      } catch (error) {
        console.log(error);
      }
    },
  })
  .mutation('delete-account', {
    async resolve({ ctx }) {
      try {
        const id = ctx.session.user.id;
        const user = await ctx.prisma.user.findUnique({
          where: {
            id,
          },
          include: {
            accounts: true,
            sessions: true,
          },
        });
        const account = user?.accounts[0];
        await ctx.prisma.account.delete({
          where: {
            id: account?.id,
          },
        });
        await ctx.prisma.user.delete({
          where: {
            id,
          },
        });

        await ctx.prisma.$disconnect();
      } catch (error) {
        console.log(error);
      }
    },
  });
