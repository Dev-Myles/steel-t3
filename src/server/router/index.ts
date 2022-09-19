// src/server/router/index.ts
import superjson from 'superjson';
import { accountRouter } from './account';
import cardRouter from './card';
import { createRouter } from './context';

import { protectedExampleRouter } from './protected-example-router';
import { searchRouter } from './search';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('question.', protectedExampleRouter)
  .merge('account.', accountRouter)
  .merge('card.', cardRouter)
  .merge('search.', searchRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
