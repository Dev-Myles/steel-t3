import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import AccountCards from '../components/account/AccountCards';
import AccountInfo from '../components/account/AccountInfo';
import AccountLikes from '../components/account/AccountLikes';
import AccountLinks from '../components/account/AccountLinks';
import { LoadingGif } from '../components/util/LoadingGif';
import { trpc } from '../utils/trpc';

const Account: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { isLoading, data } = trpc.useQuery(['account.get-profile'], {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const cards = data?.cards;
  const links = data?.links;
  const profileId = data?.id;
  const props = data || {};

  function redirect() {
    setTimeout(() => {
      router.push('/auth/signin');
    }, 2000);
  }

  if (status === 'loading') {
    return <LoadingGif />;
  }

  if (!session) {
    redirect();
    return (
      <div>
        <h1>You must be logged in to view your account.</h1>
      </div>
    );
  }

  return (
    <div className="h-min-screen w-screen mx-auto lg:w-fit h-fit flex flex-col border-x-2 border-gray-200 p-4 my-4">
      <div className="lg:flex">
        <div className="flex justify-around flex-col">
          <div className="mt-3">
            <AccountInfo
              key={uuidv4()}
              session={session}
              props={props}
              isLoading={isLoading}
            />
          </div>

          <div className="mt-3">
            <AccountLikes key={uuidv4()} />
          </div>
        </div>
        <div className="mt-3 lg:ml-2">
          <AccountLinks
            key={uuidv4()}
            profileId={profileId}
            links={links}
            isLoading={isLoading}
          />
        </div>
      </div>
      <div className="mt-3">
        <AccountCards key={uuidv4()} isLoading={isLoading} cards={cards} />
      </div>
    </div>
  );
};

export default Account;
