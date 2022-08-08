import { NextPage } from 'next';
import { useSession } from 'next-auth/react';

const NewUser: NextPage<any> = () => {
  const { data: session } = useSession();
  const name = session?.user?.name;
  return (
    <div className="h-screen grid place-items-center">
      <div>
        <h1>Thank you for signing up, {name}!</h1>
        <p>You can now have full user access to the website, have fun!</p>
      </div>
    </div>
  );
};

export default NewUser;
