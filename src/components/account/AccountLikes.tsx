import { v4 as uuidv4 } from 'uuid';
import { trpc } from '../../utils/trpc';
import EditButton from '../buttons/EditButton';
import { LoadingGif } from '../util/LoadingGif';

export const AccountLikes: React.FC = () => {
  const { isLoading, data } = trpc.useQuery(['account.get-liked-cards'], {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const likedCards = data;
  const totalLikes = data?.length;

  if (isLoading) {
    return (
      <div className=" rounded-lg  bg-white h-fit w-fit p-8">
        <h3 className="text-2xl">Liked Cards</h3>
        <LoadingGif />
      </div>
    );
  }

  if (!totalLikes) {
    return (
      <div className="bg-white  rounded-lg h-fit p-8">
        <h3>You have liked no cards...</h3>
      </div>
    );
  }

  function mapLikes() {
    return likedCards?.map((e: any) => {
      return (
        <div
          key={uuidv4()}
          className=" rounded-lg border-2 border-cyan-400 truncate bg-white p-8 m-2"
        >
          <span>{e.creatorId}</span>
          <br />
          <span>{e.name}</span>
        </div>
      );
    });
  }

  return (
    <div className="rounded-lg shadow bg-white h-fit p-4 pr-2">
      <EditButton editFn={null} />
      <h3 className="text-2xl">
        Liked Cards -{' '}
        <span className="text-gray-400 font-thin text-sm">
          total: {totalLikes}
        </span>
      </h3>
      <div className="flex justify-center ">{mapLikes()}</div>
    </div>
  );
};

export default AccountLikes;
