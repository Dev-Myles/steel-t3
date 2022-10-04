import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { BsFillFileCodeFill, BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { v4 as uuidv4 } from 'uuid';

const SignInForm: React.FC<{ providers: object }> = ({ providers }) => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push('/');
  }

  const logo = {
    google: <FcGoogle />,

    github: <BsGithub />,
  };

  function findLogo(provider: string) {
    return provider === 'Google' ? logo.google : logo.github;
  }

  const SigninGreeting: React.FC = () => {
    return (
      <div className="bg-gradient-to-br lg:rounded-bl-2xl from-background to-slate-900 p-8 flex flex-col justify-around items-center  ">
        <h3 className="lg:w-[450px] text-slate-400 text-3xl sm:text-4xl lg:text-5xl lg:font-HindThin font-Hind text-center">
          Welcome Back! Or... Join with one click!
        </h3>
        <div className="lg:text-[150px] mt-6 lg:mt-0 text-8xl text-second">
          <BsFillFileCodeFill />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto lg:rounded-b-2xl flex  w-full sm:w-full lg:w-fit sm:mt-9 lg:mt-56 shadow-md h-fit justify-center items-center shadow-second/60 border-t-[1px] border-slate-900  ">
        <div className="    flex sm:w-full flex-col lg:flex-row">
          <SigninGreeting />
          <div className="p-8 text-center bg-panel lg:rounded-br-2xl lg:py-16 ">
            <h1 className="font-bold font-Hind text-text text-3xl border-b-2 border-dashed border-slate-700 pb-4 ">
              Sign In/Up
            </h1>
            <div className="my-3">
              <span className="font-Hind text-xl">
                Create an account with one click!
              </span>
            </div>
            {Object.values(providers).map((provider) => {
              const name = provider.name;
              return (
                <button
                  key={uuidv4()}
                  className="flex p-2 px-10 mx-auto my-5 border-slate-700 border-[1px] hover:border-second  items-center shadow-none bg-inherit hover:text-gray-300 hover:bg-inherit
                "
                  onClick={() => signIn(provider.id)}
                >
                  <span className="h-fit mr-2 font-HindThin text-lg">
                    Sign in with {name}
                  </span>
                  {findLogo(name)}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
