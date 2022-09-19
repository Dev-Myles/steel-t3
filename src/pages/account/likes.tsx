import { NextPage } from 'next';
import { LoadingGif } from '../../components/util/LoadingGif';
import { mapCardsLink } from '../../components/util/mapCards';
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

  return (
    <div className="min-h-screen">
      <Options />
      <div className="flex flex-wrap justify-center w-full sm:w-11/12 mx-auto">
        {mapCardsLink(cards, true)}
      </div>
    </div>
  );
};

export default AccountLikes;
