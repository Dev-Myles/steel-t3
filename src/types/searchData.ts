import { Card, CardLinks, Links, Profile } from '@prisma/client';

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
    cardData: (Card & {
      links: CardLinks | null;
    })[];
    message: string | null;
  };
  tags?: {
    cardData: (Card & {
      links: CardLinks | null;
    })[];
    message: string | null;
  };
}

export default ISearchData;
