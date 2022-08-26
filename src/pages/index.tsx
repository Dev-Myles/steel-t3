import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <div className="grid h-screen place-content-center">
      <h1>Home page</h1>
    </div>
  );
};

export default Home;
