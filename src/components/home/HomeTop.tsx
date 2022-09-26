import Image from 'next/image';
import { useRouter } from 'next/router';

const HomeTop: React.FC = () => {
  const router = useRouter();
  return (
    <div className="h-screen">
      <div className="flex py-10 flex-col sm:flex-row">
        <div className="sm:w-1/3 p-5 mt-11 sm:p-12 text-lg">
          <h3 className="font-Poppins text-4xl sm:text-6xl mb-9 ">
            Be confident and concise. Share prepared.
          </h3>
          <p className=" text-xl sm:text-3xl font-HindThin">
            Ever been asked what you do or what you&apos;re working on? Lost for
            words? Forget? We&apos;ve got the solution.
          </p>
          <button
            onClick={() => router.push('/card/create-card')}
            className=" hover:from-violet-500 w-2/3  sm:text-2xl hover:to-second ease-in-out duration-300 bg-gradient-to-r to-second from-violet-900 mt-8 sm:mt-12 border-none p-2 px-12 font-HindThin  text-xl"
          >
            Create a card
          </button>
        </div>
        <div className=" w-full hidden sm:block  sm:mt-12 pt-6 ml-32 sm:w-1/2 border-l-[1px] border-dashed border-white">
          <Image
            src={'/images/home/topbanner.svg'}
            height={1}
            width={2}
            layout="responsive"
            alt="Home pic"
          />
        </div>
      </div>
      <h2 className="text-3xl  p-4 sm:p-2 text-center sm:text-6xl font-Poppins">
        Share what you do courageously.
      </h2>
      {/* <hr className="mt-16 bg-panel w-2/3 mx-auto border-dashed" /> */}
    </div>
  );
};

export default HomeTop;
