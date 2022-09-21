import { Card, Links, Profile } from '@prisma/client';

interface ISearchData {
  profiles?: {
    message: string | null;
    profileData: (Profile & {
      user: {
        image: string | null;
      };
      cards: Card[];
      links: Links | null;
    })[];
  };
  card?: {
    cardData: Card[];
    message: string | null;
  };
  tags?: {
    cardData: Card[];
    message: string | null;
  };
}

export default ISearchData;
