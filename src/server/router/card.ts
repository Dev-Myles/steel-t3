import z from 'zod';
import { createRouter } from './context';

export const cardRouter = createRouter().query('get-card', {
  input: z.string(),
  async resolve({ ctx, input }) {
    try {
      const card = await ctx.prisma.card.findUnique({
        where: {
          id: input,
        },
      });
      return card;
    } catch (error) {
      console.log(error);
    }
  },
});

export default cardRouter;
