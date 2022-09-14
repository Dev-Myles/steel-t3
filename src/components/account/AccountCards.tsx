import { Card } from '@prisma/client';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { LoadingGif } from '../util/LoadingGif';

export const AccountCards: React.FC<{
  cards: Card[] | undefined;
  isLoading: boolean;
}> = ({ cards, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg h-fit p-4 pr-2">
        <h3 className=" text-2xl">Your Cards</h3>
        <LoadingGif />
      </div>
    );
  }
  const totalCards = cards?.length;

  if (!totalCards) {
    return (
      <div className="bg-white h-40 grid place-content-center shadow rounded-lg p-4 pr-2 ">
        <h3>You have not created any Cards</h3>
        <Link href="/card/create-card">
          <a className="w-fit mx-auto">
            <button className="p-2 mt-2 text-xlg">Create a Card</button>
          </a>
        </Link>
      </div>
    );
  }

  function mapCards() {
    const threeCards = cards ? cards.slice(0, 3) : undefined;
    return threeCards?.map((card) => {
      return (
        <div
          key={uuidv4()}
          className="bg-zinc-800 flex items-center justify-center m-2 w-28 h-32 text-center p-2 border-2 sm:w-40 border-emerald-600 shadow-lg truncate  rounded-lg"
        >
          <span className="truncate text-xl">{card.name}</span>
        </div>
      );
    });
  }

  return (
    <div className="bg-panel shadow rounded-lg h-fit p-4 pr-2">
      <div className="flex justify-between">
        <h3 className=" text-2xl">
          Your Cards -{' '}
          <span className="text-gray-400 text-sm font-thin">
            total cards: {totalCards}
          </span>
        </h3>
        <Link href="/account/cards">
          <a>
            <span className="text-gray-400">View all</span>
          </a>
        </Link>
      </div>
      <div className="flex flex-wrap items-center justify-center">
        {mapCards()}
        {totalCards > 3 ? (
          <Link href="/account/cards">
            <a>
              <span className="text-gray-400 text-4xl">
                + {totalCards - 3} <br /> more...
              </span>
            </a>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default AccountCards;
