import EditButton from '../buttons/EditButton';
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
    <div className="w-full bg-white  p-2 rounded-lg shadow h-fit">
      <EditButton />
      <h1 className="text-center font-bold text-5xl ">Accout Info</h1>
      {isLoading ? (
        <LoadingGif />
      ) : (
        <div className="flex flex-col p-8 justify-around  ">
          <div className="mx-auto">
            <UserImage />
          </div>
          <div>
            <div className="m-3">
              <span className=" font-bold text-4xl text-cyan-600">Name</span>
              <span className="block font-semibold text-xl">{name}</span>
            </div>
            <div className="m-3 border-b-2 border-gray-400 pb-5">
              <span className=" font-bold text-4xl text-cyan-600">Email</span>
              <span className="block font-semibold text-xl">{email}</span>
            </div>

            <div className="lg:flex lg:justify-between [&>*]:inline-block [&>*]:m-3 [&>*]:text-start ">
              <div className="font-bold">
                <span className=" text-xl text-cyan-600">Username</span>
                <br />
                <span>{userName}</span>
              </div>
              <div className="font-bold">
                <span className=" text-xl text-cyan-600">
                  Profile Visability
                </span>
                <br />

                <div className="flex items-center">
                  <span className="">Public</span>
                  <button className="h-4 w-10"></button>
                  <span className="">Private</span>
                </div>
                <span className="text-gray-400 font-thin">
                  Current Status: {privateStatus ? 'private' : 'public'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountInfo;
