import { NextPage } from 'next';

const NewUser: NextPage<any> = () => {
  return (
    <div className="h-screen grid place-items-center">
      <div>
        <h1>Thank you for signing up, {}!</h1>
        <p>You can now have full user access to the website, have fun!</p>
      </div>
    </div>
  );
};

export default NewUser;
