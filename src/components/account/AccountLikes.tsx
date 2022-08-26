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
      <div className=" rounded-lg  bg-white h-fit w-fit p-8">
        <h3 className="text-2xl">Liked Cards</h3>
        <LoadingGif />
      </div>
    );
  }

  if (!totalLikes) {
    return (
      <div className="bg-white  rounded-lg h-48 grid place-content-center shadow">
        <h3>You have liked no cards...</h3>
      </div>
    );
  }

  function mapCard() {
    const card = data ? data[0] : undefined;
    return (
      <div
        key={uuidv4()}
        className=" rounded-lg border-2 w-32 h-36 border-cyan-400 truncate bg-white p-2 m-2"
      >
        <span>{card?.creatorId}</span>
        <br />
        <span>{card?.name}</span>
      </div>
    );
  }

  return (
    <div className="rounded-lg shadow bg-white h-fit p-4 pr-2">
      <div className="flex justify-between">
        <h3 className="text-2xl">
          Liked Cards -{' '}
          <span className="text-gray-400 font-thin text-sm">
            total: {totalLikes}
          </span>
        </h3>
        <Link href="/account/likes">
          <a>
            <span className="text-gray-400">View All</span>
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
