import { Card } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import EditButton from '../buttons/EditButton';
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
      <div>
        <h3>You have not created any Cards</h3>
      </div>
    );
  }

  function mapCards() {
    return cards?.map((card) => {
      return (
        <div
          key={uuidv4()}
          className="bg-white border-2 border-emerald-600 shadow-lg truncate m-4 rounded-lg p-8"
        >
          <span>{card.name}</span>
          <br />
          <span>{card.creatorId}</span>
        </div>
      );
    });
  }

  return (
    <div className="bg-white shadow rounded-lg h-fit p-4 pr-2">
      <EditButton editFn={null} />
      <h3 className=" text-2xl">
        Your Cards -{' '}
        <span className="text-gray-400 text-sm font-thin">
          total cards: {totalCards}
        </span>
      </h3>
      <div className="flex justify-center">{mapCards()}</div>
    </div>
  );
};

export default AccountCards;
