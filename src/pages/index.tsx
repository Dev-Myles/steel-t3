import type { NextPage } from 'next';
import HomeMiddle from '../components/home/HomeMiddle';
import HomeTop from '../components/home/HomeTop';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#14161c] via-[#0c0d11] to-[#0d1525]">
      <HomeTop />
      <HomeMiddle />
    </div>
  );
};

export default Home;
