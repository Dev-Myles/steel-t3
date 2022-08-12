import { useSession } from 'next-auth/react';
import Image from 'next/image';
import loadingGif from '../../public/gifs/loading.svg';
import pic from '../../public/images/user/default-user.png';
import { trpc } from '../../utils/trpc';

const AccountInfo: React.FC<{ userId: string | undefined }> = ({ userId }) => {
  const { data: session } = useSession();
  const imageScr = session?.user?.image || '/images/user/default-user.png';
  const name = session?.user?.name;
  const email = session?.user?.email;
  const id = userId || 'run';
  const { isLoading, data } = trpc.useQuery([
    'account.get-profile',
    { userId: id },
  ]);
  const privateAccount = data?.private;

  const LoadingGif: React.FC = () => {
    return (
      <div className="mx-auto">
        <Image
          src={loadingGif}
          alt="loading"
          height={70}
          width={70}
          layout="fixed"
        />
      </div>
    );
  };

  const userImage = imageScr ? (
    <Image
      src={imageScr}
      alt="User Image"
      height={70}
      width={70}
      layout="fixed"
      className="rounded-full"
    />
  ) : (
    <Image
      src={pic}
      alt="User Image"
      height={70}
      width={70}
      layout="fixed"
      className="rounded-full"
    />
  );
  return (
    <div className="w-fit">
      <div>
        <div className="flex flex-col p-8 justify-around  bg-gray-50 rounded-lg shadow-lg">
          <h1 className="text-center font-bold text-5xl mb-3 text-cyan-600">
            Accout Info
          </h1>
          <div className="mx-auto">{userImage}</div>
          <div>
            <div className="m-3">
              <span className="text-cyan-600 font-bold text-4xl">Name</span>
              <span className="block font-semibold text-xl">{name}</span>
            </div>
            <div className="m-3">
              <span className="text-cyan-600 font-bold text-4xl">Email</span>
              <span className="block font-semibold text-xl">{email}</span>
            </div>
            <div>
              <span className="text-cyan-600 font-bold text-xl">
                Profile Visability
              </span>
              <span>
                Current Status: {privateAccount ? 'private' : 'public'}
              </span>
              {isLoading ? (
                <LoadingGif />
              ) : (
                <div className="flex items-center">
                  <span className="font-bold">Public</span>
                  <button className="bg-cyan-600 h-4 w-10 rounded-full"></button>
                  <span className="font-bold">Private</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
