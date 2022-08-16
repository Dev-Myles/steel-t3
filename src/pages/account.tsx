import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import AccountInfo from '../components/account/AccountInfo';
import { AccountLikes } from '../components/account/AccountLikes';
import AccountLinks from '../components/account/AccountLinks';
import { LoadingGif } from '../components/util/LoadingGif';
import { trpc } from '../utils/trpc';

const Account: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { isLoading, data } = trpc.useQuery(['account.get-profile']);

  const props = data ? data : {};

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
    <div className="h-min-screen h-fit flex flex-col">
      <div className="flex flex-row">
        <AccountInfo
          key={uuidv4()}
          session={session}
          props={props}
          isLoading={isLoading}
        />
        <AccountLinks key={uuidv4()} props={props} isLoading={isLoading} />
        <AccountLikes key={uuidv4()} />
      </div>
    </div>
  );
};

export default Account;
