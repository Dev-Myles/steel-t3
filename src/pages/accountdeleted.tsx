import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AccountDeletedPage: NextPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex-col flex items-center  ">
      <h1 className="mt-24 text-red-500 text-2xl">
        Your account has been deleted. Sorry to see you go...
      </h1>
      <Link href={'/'}>
        <a className="underline text-second text-2xl">Home</a>
      </Link>
    </div>
  );
};

export default AccountDeletedPage;
