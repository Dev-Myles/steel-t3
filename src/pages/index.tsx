import type { NextPage } from 'next';
import HomeBottom from '../components/home/HomeBottom';
import HomeMiddle from '../components/home/HomeMiddle';
import HomeTop from '../components/home/HomeTop';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1c24] via-[#14151b] to-[#0e1729]">
      <HomeTop />
      <HomeMiddle />
      <HomeBottom />
    </div>
  );
};

export default Home;
