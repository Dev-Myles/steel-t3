import { Links, User } from '@prisma/client';
import ICard from './card';

interface IProfile {
  id: string;
  userName: string;
  userId: string;
  links: Links;
  private: boolean;
  user: User;
  liked: String[];
  cards: ICard[];
}

export default IProfile;
