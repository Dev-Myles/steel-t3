import { useRouter } from 'next/router';

const HomeBottom: React.FC = () => {
  const router = useRouter();
  return (
    <div className="bg-background border-b-[1px] p-5 pb-12 lg:py-24 flex  justify-center flex-col items-center border-slate-700 ">
      <h3 className="font-Poppins text-7xl mb-5">Join Today!</h3>
      <p className="text-3xl mb-5">Sign in with your Google or GitHub.</p>
      <button
        onClick={() => router.push('/auth/signin')}
        className=" hover:from-violet-500  mx-auto my-5  lg:text-2xl hover:to-second ease-in-out duration-300 bg-gradient-to-r to-second from-violet-900  border-none p-2 px-12 font-HindThin  text-xl"
      >
        Create an account
      </button>
    </div>
  );
};

export default HomeBottom;
