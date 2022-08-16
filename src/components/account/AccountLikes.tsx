import { v4 as uuidv4 } from 'uuid';
import { trpc } from '../../utils/trpc';
import { LoadingGif } from '../util/LoadingGif';

export const AccountLikes: React.FC = () => {
  const { isLoading, data } = trpc.useQuery(['account.get-liked-cards']);
  const likedCards = data;

  console.log(likedCards);
  if (isLoading) {
    return (
      <div className=" rounded-lg shadow-lg bg-gray-50 h-fit w-fit p-8">
        <LoadingGif />
      </div>
    );
  }

  if (!likedCards?.length) {
    return (
      <div className="bg-gray-50 shadow-lg rounded-lg h-fit p-8">
        <h3>You have liked no cards...</h3>
      </div>
    );
  }

  function mapLikes() {
    return likedCards?.map((e: any) => {
      return (
        <div
          key={uuidv4()}
          className=" rounded-lg mx-2 bg-white shadow-lg p-8 h-fit w-fit"
        >
          <span>{e.creatorId}</span>
          <br />
          <span>{e.name}</span>
        </div>
      );
    });
  }

  return (
    <div className=" rounded-lg shadow-lg bg-gray-50 h-fit w-fit p-8">
      <h1>Liked Cards</h1>
      <div className="flex ">{mapLikes()}</div>
    </div>
  );
};
