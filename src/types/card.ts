import { Card, CardLinks, Profile } from '@prisma/client';

interface ICard {
  id: string;
  creatorId: string;
  likedBy: string[];
  private: boolean;
  name: string;
  projectType: string;
  level: string;
  openSource: boolean;
  description: string;
  uses: string;
  links: CardLinks | { github: string; website: string };
  tags: string[];
}

export interface IProfileCards {
  data:
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

export interface ICards {
  cards:
    | (Card & {
        links: CardLinks | null;
      })[]
    | undefined;
}

export default ICard;
