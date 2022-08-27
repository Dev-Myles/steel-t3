import { NextPage } from 'next';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { LoadingGif } from '../../components/util/LoadingGif';
import { useSessionCheck } from '../../utils/session/checkSession';
import { trpc } from '../../utils/trpc';

export const AccountLikes: NextPage = () => {
  const sess = useSessionCheck();
  const { data, isLoading } = trpc.useQuery(['account.get-liked-cards']);
  const cards = data;

  const Options: React.FC = () => {
    return (
      <div className="flex justify-around m-4">
        <h1 className="text-3xl">Liked Cards</h1>
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
        <div className="text-center">
          <h3 className="text-2xl mt-10">You have not liked any cards...</h3>
        </div>
      );
    }
    return cards?.map((card) => {
      return (
        <Link key={uuidv4()} href={`/card/${card.id}`}>
          <a>
            <div className="border-2 w-32 h-44 rounded-lg truncate border-gray-600 p-2 m-2">
              <span>{card.name}</span>
              <br />
              <span>{card.creatorId}</span>
            </div>
          </a>
        </Link>
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
