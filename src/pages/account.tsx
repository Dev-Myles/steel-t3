import type { NextPage } from 'next';
import { v4 as uuidv4 } from 'uuid';
import AccountCards from '../components/account/AccountCards';
import AccountDelete from '../components/account/AccountDelete';
import AccountInfo from '../components/account/AccountInfo';
import AccountLikes from '../components/account/AccountLikes';
import AccountLinks from '../components/account/AccountLinks';
import { LoadingGif } from '../components/util/LoadingGif';
import { useSessionCheck } from '../utils/session/checkSession';
import { trpc } from '../utils/trpc';

const Account: NextPage = () => {
  const sess = useSessionCheck(true);

  const { isLoading, data } = trpc.useQuery(['account.get-profile']);

  // const { isLoading, data } = trpc.useQuery(['account.get-profile'], {
  //   staleTime: Infinity,
  //   cacheTime: Infinity,
  // });
  const cards = data?.cards;
  const links = data?.links;
  const profileId = data?.id;
  const props = data || {};

  if (isLoading || sess.status === 'loading') {
    return (
      <div className="grid place-content-center h-screen">
        <LoadingGif />
      </div>
    );
  }

  return (
    <div className="h-min-screen bg-panel lg:rounded-3xl w-screen lg:shadow-md mx-auto lg:w-1/2 h-fit flex flex-col  p-6 my-4">
      <AccountInfo
        key={uuidv4()}
        session={sess.session}
        props={props}
        isLoading={isLoading}
      />
      <AccountLinks
        key={uuidv4()}
        profileId={profileId}
        links={links}
        isLoading={isLoading}
      />

      <AccountCards key={uuidv4()} isLoading={isLoading} cards={cards} />
      <AccountLikes key={uuidv4()} />
      <AccountDelete key={uuidv4()} />
    </div>
  );
};

export default Account;
