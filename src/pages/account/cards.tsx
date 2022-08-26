import { NextPage } from 'next';

import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import Card from '../../components/cards/Card';
import { LoadingGif } from '../../components/util/LoadingGif';
import { useSessionCheck } from '../../utils/session/checkSession';
import { trpc } from '../../utils/trpc';

export const AccountCards: NextPage = () => {
  const sess = useSessionCheck();
  const { data, isLoading } = trpc.useQuery(['account.get-profile']);
  const cards = data?.cards;

  const Options: React.FC = () => {
    return (
      <div className="flex justify-around items-center m-4 ">
        <h1 className="text-3xl">Your Cards</h1>

        <Link href="/card/create-card">
          <a className="w-fit">
            <button className="px-2 text-xl">Create Card</button>
          </a>
        </Link>
      </div>
    );
  };

  if (sess.status === 'loading') {
    return <div className="h-screen"></div>;
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

  function mapCards() {
    if (!cards?.length) {
      return (
        <div className=" grid place-content-center">
          <h3 className="text-2xl p-2 text-center">
            You have not created any cards
          </h3>
        </div>
      );
    }
    return cards?.map((card) => {
      return (
        <Link key={uuidv4()} href={`/card/${card.id}`}>
          <a>
            <Card
              projectType={card.projectType}
              creatorId={card.creatorId}
              privateStatus={card.private}
              name={card.name}
              likes={card.likedBy}
              level={card.level}
              openSource={card.openSource}
              description={card.description}
              uses={card.uses}
            />
          </a>
        </Link>
      );
    });
  }

  return (
    <div className="h-screen">
      <Options />
      <div className="flex flex-wrap justify-center w-full sm:w-11/12 mx-auto">
        {mapCards()}
      </div>
    </div>
  );
};

export default AccountCards;
