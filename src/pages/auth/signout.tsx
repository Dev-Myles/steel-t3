import { NextPage } from 'next';

const SignOut: NextPage = () => {
  return (
    <div className="h-screen grid place-items-center">
      <p>
        <span className="text-cyan-700 text-4xl">You have been signed out</span>
      </p>
    </div>
  );
};

export default SignOut;
