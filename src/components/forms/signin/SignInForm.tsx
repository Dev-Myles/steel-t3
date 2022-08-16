import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import IconProvider from '../../providers/IconProvider';
const SignInForm: React.FC<{ providers: object }> = ({ providers }) => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push('/');
  }

  const logo = {
    google: <IconProvider icon={<FcGoogle />} />,

    github: <IconProvider icon={<BsGithub />} />,
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
              className="border-2 hover:shadow-lg hover:cursor-pointer hover:border-cyan-700 ease-in-out duration-300 border-gray-300 rounded-lg py-3 px-10 text-lg m-2"
            >
              <button
                className="flex items-center shadow-none bg-inherit text-cyan-600 hover:bg-inherit
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

export default SignInForm;
