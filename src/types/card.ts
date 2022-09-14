import { CardLinks } from '@prisma/client';

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

export default ICard;
