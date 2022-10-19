import Image from 'next/image';
import { useRouter } from 'next/router';

const HomeTop: React.FC = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen mb-32 sm:mb-14">
      <div className="flex py-10 flex-col lg:flex-row justify-center items-center">
        <div className="lg:w-1/3 p-5 mt-11 lg:p-12 text-lg flex flex-col">
          <h3 className="font-Poppins text-4xl lg:text-6xl mb-9 ">
            Be confident and concise. Share prepared.
          </h3>
          <p className=" text-xl lg:text-3xl font-HindThin">
            Ever been asked what you do or what you&apos;re working on? Lost for
            words? Forget? We&apos;ve got the solution.
          </p>
          <button
            onClick={() => router.push('/card/create-card')}
            className=" hover:from-violet-500 w-2/3 mx-auto  lg:text-2xl hover:to-second ease-in-out duration-300 bg-gradient-to-r to-second from-violet-900 mt-8 lg:mt-12 border-none p-2 px-12 font-HindThin  text-xl"
          >
            Create a card
          </button>
        </div>
        <div className="w-full hidden sm:block lg:mt-12 pt-6 lg:ml-32 lg:w-1/2 lg:border-l-[1px] border-dashed border-white">
          <Image
            src={'/images/home/topbanner.svg'}
            height={1}
            width={2}
            layout="responsive"
            alt="Home pic"
          />
        </div>
      </div>
      <h2 className="text-3xl md:pb-24 lg:pb-10  p-4 lg:p-2 text-center lg:text-6xl font-Poppins">
        Present what you do courageously.
      </h2>
    </div>
  );
};

export default HomeTop;
