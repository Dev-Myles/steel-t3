import { Card, Links, User } from '@prisma/client';

interface IProfile {
  id: string;
  userName: string;
  userId: string;
  links: Links;
  private: boolean;
  user: User;
  liked: String[];
  cards: Card[];
}

export default IProfile;
