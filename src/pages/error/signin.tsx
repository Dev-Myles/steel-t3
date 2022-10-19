import { NextPage } from 'next/types';

const SignInErrorPage: NextPage = () => {
  return (
    <div className="grid place-content-center min-h-screen">
      <h1 className="text-red-400 text-2xl">
        There was an error signing in. This is most likely due to database
        hibernation. Please try again later.
      </h1>
    </div>
  );
};

export default SignInErrorPage;
