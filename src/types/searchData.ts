import { Card, Profile } from '@prisma/client';

interface ISearchData {
  profiles?: Profile[];
  card?: Card[];
  tags?: Card[];
}

export default ISearchData;
