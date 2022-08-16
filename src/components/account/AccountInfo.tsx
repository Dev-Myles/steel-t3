import { LoadingGif } from '../util/LoadingGif';
import { UserImage } from '../util/UserImage';

const AccountInfo: React.FC<{
  props: any | undefined;
  isLoading: any | undefined;
  session: any | undefined;
}> = ({ props, isLoading, session }) => {
  const email = session?.user?.email || 'errorFetching@email.com';
  const name = session?.user?.name || 'errorFetchingName';
  const { private: privateStatus, userName } = props;

  return (
    <div className="w-fit bg-gray-50 rounded-lg shadow-lg h-fit">
      <h1 className="text-center font-bold text-5xl mb-3 text-cyan-600">
        Accout Info
      </h1>
      {isLoading ? (
        <LoadingGif />
      ) : (
        <div className="flex flex-col p-8 justify-around  ">
          <div className="mx-auto">
            <UserImage />
          </div>
          <div>
            <div className="m-3">
              <span className="text-cyan-600 font-bold text-4xl">Name</span>
              <span className="block font-semibold text-xl">{name}</span>
            </div>
            <div className="m-3">
              <span className="text-cyan-600 font-bold text-4xl">Email</span>
              <span className="block font-semibold text-xl">{email}</span>
            </div>
            <div className="flex items-start [&>*]:inline-block [&>*]:m-3 [&>*]:text-start ">
              <div className="font-bold">
                <span className="text-cyan-600  text-xl">Username</span>
                <br />
                <span>{userName}</span>
              </div>
              <div className="font-bold">
                <span className="text-cyan-600 text-xl">
                  Profile Visability
                </span>
                <br />
                <span className="text-gray-400 font-thin">
                  Current Status: {privateStatus ? 'private' : 'public'}
                </span>

                <div className="flex items-center">
                  <span className="font-bold">Public</span>
                  <button className="bg-cyan-600 h-4 w-10 rounded-full"></button>
                  <span className="font-bold">Private</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountInfo;
