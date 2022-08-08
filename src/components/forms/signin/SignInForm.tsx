import type { GetServerSideProps } from 'next';
import { getProviders, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { IconContext } from 'react-icons';
import { BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

const SignInForm: React.FC<{ providers: object }> = ({ providers }) => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push('/');
  }
  const logo = {
    google: (
      <IconContext.Provider
        value={{
          size: '1.5em',
          className: 'inline',
          style: { verticalAlign: 'center', marginLeft: '5px' },
        }}
      >
        <div>
          <FcGoogle />
        </div>
      </IconContext.Provider>
    ),

    github: (
      <IconContext.Provider
        value={{
          size: '1.5em',
          className: 'inline',
          style: { verticalAlign: 'center', marginLeft: '5px' },
        }}
      >
        <div>
          <BsGithub />
        </div>
      </IconContext.Provider>
    ),
  };

  function findLogo(provider: string) {
    return provider === 'Google' ? logo.google : logo.github;
  }

  return (
    <div className="h-screen grid items-center">
      <div className="mx-auto p-8 shadow-md bg-white rounded-lg text-center">
        <h1 className="font-bold text-3xl text-cyan-600">Sign In/Up</h1>
        {Object.values(providers).map((provider) => {
          const name = provider.name;
          return (
            <div
              key={name}
              className="border-2 hover:shadow-lg hover:cursor-pointer hover:border-cyan-700 ease-in-out duration-300 border-gray-300 rounded-lg text-cyan-600 font-bold py-3 px-10 text-lg m-2"
            >
              <button
                className="flex items-center 
                "
                onClick={() => signIn(provider.id)}
              >
                <span className="h-fit ">Sign in with {name}</span>
                {findLogo(name)}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};

export default SignInForm;
