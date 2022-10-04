import type { NextPage } from 'next';
import HomeBottom from '../components/home/HomeBottom';
import HomeCardDiagram from '../components/home/HomeCardDiagram';
import HomeMiddle from '../components/home/HomeMiddle';
import HomeTop from '../components/home/HomeTop';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1c24]  to-[#3b184d]">
      <HomeTop />
      <HomeMiddle />
      <HomeCardDiagram />
      <HomeBottom />
    </div>
  );
};

export default Home;
