import { NextPage } from 'next';
import Link from 'next/link';
import { LoadingGif } from '../../components/util/LoadingGif';
import { mapCardsLink } from '../../components/util/mapCards';
import { useSessionCheck } from '../../utils/session/checkSession';
import { trpc } from '../../utils/trpc';

export const AccountCards: NextPage = () => {
  const sess = useSessionCheck(true);
  const { data, isLoading } = trpc.useQuery(['account.get-profile'], {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const cardData = data?.cards;

  const Options: React.FC = () => {
    return (
      <div className="flex justify-around sm:flex-row flex-col items-center m-4 ">
        <h1 className="text-3xl bg-background rounded-full">Your Cards</h1>

        <Link href="/card/create-card">
          <a className="w-fit">
            <button className="px-2 mt-4 sm:mt-0 bg-background text-xl">
              Create Card
            </button>
          </a>
        </Link>
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

  function mapCards(cards: any) {
    if (!cards?.length) {
      return (
        <div className=" grid place-content-center">
          <h3 className="text-2xl p-2 text-center">
            You have not created any cards
          </h3>
        </div>
      );
    }
    return mapCardsLink(cards, false);
  }

  return (
    <div className="min-h-screen mb-20">
      <Options />
      <div className="flex flex-wrap justify-center w-screen sm:w-11/12 mx-auto">
        {mapCards(cardData)}
      </div>
    </div>
  );
};

export default AccountCards;
