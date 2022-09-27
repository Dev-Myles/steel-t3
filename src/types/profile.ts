import { Card, CardLinks, Links, Profile } from '@prisma/client';

interface IProfile {
  profile:
    | (Profile & {
        cards: (Card & {
          links: CardLinks | null;
        })[];
        links: Links;
        user: {
          image: string | null;
        };
      })
    | null
    | undefined;
}

export default IProfile;
