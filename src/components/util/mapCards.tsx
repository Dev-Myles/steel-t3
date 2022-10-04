import { Card as CardType, CardLinks } from '@prisma/client';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import Card from '../cards/Card';

export enum ActionType {
  edit = 'EDIT',
  delete = 'DELETE',
  none = 'NONE',
}

export function mapCardsLink(
  cards:
    | (CardType & {
        links: CardLinks | null;
      })[]
    | undefined,
  action: ActionType
) {
  return cards?.map((card) => {
    let linkString =
      action === ActionType.edit
        ? `/card/editcard/${card.id}`
        : action === ActionType.delete
        ? `/card/deletecard/${card.id}`
        : `/card/${card.id}`;

    const links = card?.links ? card.links : { github: '', website: '' };
    return (
      <div key={uuidv4()} className="w-11/12 sm:w-fit mx-2 mt-12">
        <Link href={linkString}>
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
