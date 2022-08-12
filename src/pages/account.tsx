import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import AccountInfo from '../components/account/AccountInfo';
import AccountLinks from '../components/account/AccountLinks';
import loadingGif from '../public/gifs/loading.svg';

const Account: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  function redirect() {
    setTimeout(() => {
      router.push('/auth/signin');
    }, 2000);
  }

  if (status === 'loading') {
    return (
      <div className="h-screen grid place-items-center">
        <Image
          src={loadingGif}
          alt="Loading"
          layout="fixed"
          height={100}
          width={100}
        />
      </div>
    );
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
    <div className="h-screen grid place-items-center">
      <div>
        <AccountInfo userId={userId} />
        <AccountLinks userId={userId} />
      </div>
    </div>
  );
};

export default Account;
