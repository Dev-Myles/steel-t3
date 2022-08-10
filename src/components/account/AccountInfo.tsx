import { useSession } from 'next-auth/react';
import Image from 'next/image';

const AccountInfo: React.FC = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const imageScr = user?.image;
  const userImage = imageScr ? (
    <Image
      src={imageScr}
      alt="User Image"
      height={70}
      width={70}
      layout="fixed"
      className="rounded-full"
    />
  ) : null;
  return (
    <div className="h-screen grid place-items-center">
      {session && imageScr ? (
        <div className="flex flex-col p-8 justify-around  bg-white rounded-lg shadow-lg">
          <h1 className="text-center font-bold text-5xl text-cyan-600">
            Accout Info
          </h1>
          <div className="mx-auto">
            {userImage ? (
              userImage
            ) : (
              <div className="h-20 w-20 bg-slate-300 rounded-full grid place-content-center">
                <span className="h-fit text-3xl font-bold">A</span>
              </div>
            )}
          </div>

          <h2>{user?.name}</h2>
          <h2>{user?.email}</h2>
        </div>
      ) : (
        <div>
          <h1>You must be logged in to view your account.</h1>
        </div>
      )}
    </div>
  );
};

export default AccountInfo;
