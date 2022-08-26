// src/server/router/index.ts
import superjson from 'superjson';
import { accountRouter } from './account';
import cardRouter from './card';
import { createRouter } from './context';

import { protectedExampleRouter } from './protected-example-router';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('question.', protectedExampleRouter)
  .merge('account.', accountRouter)
  .merge('card.', cardRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
