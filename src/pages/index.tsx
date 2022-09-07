import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <div className="grid h-screen place-content-center bg-gradient-to-br from-[#14161c] via-[#0c0d11] to-[#0d1525]">
      <h1>Home page</h1>
    </div>
  );
};

export default Home;
