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
      <div className="  h-fit p-4 pr-2">
        <h3 className=" text-2xl">Your Cards</h3>
        <LoadingGif />
      </div>
    );
  }
  const totalCards = cards?.length;

  if (!totalCards) {
    return (
      <div className=" h-40 grid place-content-center border-t-[1px] border-slate-900 p-4 pr-2 ">
        <h3 className="text-second">You have not created any Cards</h3>
        <Link href="/card/create-card">
          <a className="w-fit mx-auto">
            <button className="p-2 mt-2 border-second text-text text-xlg">
              Create a Card
            </button>
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
          className="bg-gradient-to-r from-slate-900 flex items-center justify-center m-2 w-28 h-36 text-center p-2 border-2 sm:w-32 border-slate-900 shadow-lg truncate  rounded-lg"
        >
          <span className="truncate text-sm text-second">{card.name}</span>
        </div>
      );
    });
  }

  return (
    <div className="  h-fit p-4 pr-2 border-t-[1px] border-slate-900">
      <div className="flex justify-between">
        <h3 className=" text-2xl text-second">
          Your Cards
          <span className="text-gray-400 block  text-sm font-thin">
            total cards: {totalCards}
          </span>
        </h3>
        <Link href="/account/cards">
          <a>
            <span className="text-gray-400 hover:text-main duration-150 ease-in-out">
              View all
            </span>
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
