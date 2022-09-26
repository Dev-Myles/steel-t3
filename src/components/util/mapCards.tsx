import { Card as CardType, CardLinks } from '@prisma/client';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import Card from '../cards/Card';

export function mapCardsLink(
  cards:
    | (CardType & {
        links: CardLinks | null;
      })[]
    | undefined,
  account: boolean
) {
  return cards?.map((card) => {
    const links = card?.links ? card.links : { github: '', website: '' };
    return (
      <div key={uuidv4()} className="w-11/12 sm:w-1/4 mt-12">
        <Link href={`/card/${card.id}`}>
          <a>
            <Card
              cardId={card.id}
              projectType={card.projectType}
              creatorId={card.creatorId}
              privateStatus={card.private}
              name={card.name}
              likes={card.likedBy}
              level={card.level}
              openSource={card.openSource}
              description={card.description}
              uses={card.uses}
              stateStatus={false}
              links={links}
              tags={card.tags}
            />
          </a>
        </Link>
      </div>
    );
  });
}
