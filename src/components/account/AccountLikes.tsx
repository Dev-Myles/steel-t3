import Image from 'next/image';
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
      <div className="  h-fit p-4 pr-2">
        <h3 className="text-second text-2xl">Your Likes</h3>
        <LoadingGif />
      </div>
    );
  }

  if (!totalLikes) {
    return (
      <div className="  h-24 ml-3 mt-3">
        <h3 className="text-2xl text-second">Liked Cards</h3>

        <h3 className="text-second text-center">You have liked no cards...</h3>
      </div>
    );
  }

  function mapCard() {
    const card = data ? data[0] : undefined;
    return (
      <div
        key={uuidv4()}
        className="bg-gray-200 flex flex-col items-center  m-2 w-28 h-36 p-2  sm:w-32 shadow-lg truncate  rounded-lg"
      >
        <span className="truncate font-mono font-bold text-lg text-neutral-600">
          {card?.name}
        </span>
        <div className="block w-full h-1/2">
          <Image
            alt="logo"
            src={'/images/logos/logo.svg'}
            height={3}
            width={4}
            layout="responsive"
          />
        </div>
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
