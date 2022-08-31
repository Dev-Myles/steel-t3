import { NextPage } from 'next';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import Card from '../../components/cards/Card';
import { LoadingGif } from '../../components/util/LoadingGif';
import { useSessionCheck } from '../../utils/session/checkSession';
import { trpc } from '../../utils/trpc';

export const AccountLikes: NextPage = () => {
  const sess = useSessionCheck();
  const { data, isLoading } = trpc.useQuery(['account.get-liked-cards'], {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const cards = data;

  const Options: React.FC = () => {
    return (
      <div className="flex justify-around m-4">
        <h1 className="text-3xl">Liked Cards</h1>
      </div>
    );
  };

  if (sess.status === 'loading') {
    return (
      <div className="h-screen">
        <LoadingGif />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <Options />
        <div>
          <LoadingGif />
        </div>
      </div>
    );
  }

  if (!cards) {
    return (
      <div className="grid place-content-center h-screen">
        <h1 className="text-red-400 text-4xl">
          You have not liked any cards...
        </h1>
      </div>
    );
  }

  function mapCards() {
    return cards?.map((card) => {
      const links = card.links || { github: '', website: '' };

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

  return (
    <div className="min-h-screen">
      <Options />
      <div className="flex flex-wrap justify-center w-full sm:w-11/12 mx-auto">
        {mapCards()}
      </div>
    </div>
  );
};

export default AccountLikes;
