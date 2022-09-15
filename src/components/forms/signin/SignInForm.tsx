import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { BsGithub } from 'react-icons/bs';
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

  return (
    <div className="h-screen grid items-center">
      <div className="mx-auto p-8 shadow-md bg-panel w-screen sm:w-fit rounded-2xl text-center">
        <h1 className="font-bold font-PTMono text-3xl border-b-2 border-dashed border-slate-100 pb-4 ">
          Sign In/Up
        </h1>
        <div className="my-3">
          <span className="font-bold">Create an account with one click!</span>
        </div>
        {Object.values(providers).map((provider) => {
          const name = provider.name;
          return (
            <button
              key={uuidv4()}
              className="flex p-2 px-5 mx-auto my-3 text-xl items-center shadow-none bg-inherit hover:text-gray-300 hover:bg-inherit
                "
              onClick={() => signIn(provider.id)}
            >
              <span className="h-fit mr-2">Sign in with {name}</span>
              {findLogo(name)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SignInForm;
