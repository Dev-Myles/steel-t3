import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { trpc } from '../../utils/trpc';
import { LoadingGif } from '../util/LoadingGif';

export const AccountLikes: React.FC = () => {
  const { isLoading, data } = trpc.useQuery(['account.get-liked-cards'], {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const totalLikes = data?.length;

  if (isLoading) {
    return (
      <div className=" rounded-lg   h-fit w-fit p-8">
        <h3 className="text-2xl text-second">Liked Cards</h3>
        <LoadingGif />
      </div>
    );
  }

  if (!totalLikes) {
    return (
      <div className="  rounded-lg h-48 grid place-content-center ">
        <h3 className="text-second">You have liked no cards...</h3>
      </div>
    );
  }

  function mapCard() {
    const card = data ? data[0] : undefined;
    return (
      <div
        key={uuidv4()}
        className="bg-gradient-to-r font-bold  from-slate-900 rounded-lg border-2 w-32 h-36 border-slate-900 truncate flex justify-center items-center p-2 m-2"
      >
        <span className="text-sm text-second">{card?.name}</span>
      </div>
    );
  }

  return (
    <div className="  h-fit p-4 pr-2">
      <div className="flex justify-between">
        <h3 className="text-2xl text-second">
          Liked Cards
          <span className="text-gray-400 block font-thin text-sm">
            total likes: {totalLikes}
          </span>
        </h3>
        <Link href="/account/likes">
          <a>
            <span className="text-gray-400 hover:text-main">View All</span>
          </a>
        </Link>
      </div>

      <div className="flex justify-center items-center ">
        {mapCard()}
        {totalLikes > 1 ? (
          <Link href="/account/likes">
            <a>
              <span className="h-fit my-0 text-4xl text-gray-400">
                + {totalLikes} <br />
                more...
              </span>
            </a>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default AccountLikes;
