import { Card, CardLinks, Profile } from '@prisma/client';

interface IProfile {
  profile:
    | (Profile & {
        cards: (Card & {
          links: CardLinks | null;
        })[];
        user: {
          image: string | null;
        };
      })
    | null
    | undefined;
}

export default IProfile;
