import { NextPage } from 'next';

const SignOut: NextPage = () => {
  return (
    <div className="h-screen ">
      <p className="bg-panel rounded-xl p-3 mt-20 w-fit mx-auto text-center">
        <span className="text-main text-4xl">You have been signed out</span>
      </p>
    </div>
  );
};

export default SignOut;
