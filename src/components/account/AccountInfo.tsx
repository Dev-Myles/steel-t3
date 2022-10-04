import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserNameSchema, userNameSchema } from '../../schema/user-schema';
import { trpc } from '../../utils/trpc';
import { EditFieldButton } from '../buttons/EditButton';
import { LoadingGif } from '../util/LoadingGif';
import { UserImage } from '../util/UserImage';

const AccountInfo: React.FC<{
  props: any | undefined;
  isLoading: any | undefined;
  session: any | undefined;
}> = ({ props, isLoading, session }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserNameSchema>({
    resolver: zodResolver(userNameSchema),
  });
  const [isEdit, setEdit] = useState(false);
  const email = session?.user?.email || 'errorFetching@email.com';
  const name = session?.user?.name || 'errorFetchingName';
  const { private: privateStatus, userName } = props;

  const { mutate: changeVisability } = trpc.useMutation([
    'account.profile-visability',
  ]);
  const { mutate: changeUsername } = trpc.useMutation([
    'account.change-username',
  ]);
  function visability(value: boolean) {
    window.location.reload();
    changeVisability(value);
  }

  function editName() {
    if (isEdit) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  }

  function onSubmit(data: UserNameSchema) {
    window.location.reload();
    changeUsername(data);
  }

  const activeStyle = {
    private: {
      backgroundColor: privateStatus ? 'rgb(99 102 241 )' : '',
    },
    public: {
      backgroundColor: !privateStatus ? 'rgb(99 102 241 )' : '',
    },
  };

  return (
    <div className="w-full  mb-2 h-fit">
      <h3 className="text-second text-3xl mb-2 lg:mb-0 text-center sm:text-start">
        Account Info
      </h3>
      {isLoading ? (
        <LoadingGif />
      ) : (
        <div className="flex flex-col  font-HindThin lg:p-8  justify-around  ">
          <div className="flex flex-col sm:flex-row sm:items-center flex-wrap lg:items-center ">
            <div className="mx-auto sm:mr-3">
              <UserImage h={100} w={100} />
            </div>
            <div className="truncate w-full sm:w-min sm:flex-grow my-1">
              <span className="  text-2xl text-text">Name: </span>
              <span className=" font-semibold text-xl truncate  text-neutral-200">
                {name}
              </span>
            </div>
            <div className="truncate w-full sm:w-min sm:flex-grow my-1">
              <span className="  text-2xl text-text">Email: </span>
              <span className="w-full font-semibold text-xl truncate text-neutral-200">
                {email}
              </span>
            </div>
          </div>

          <div className="sm:flex items-start sm:justify-around">
            <div className="flex items-center my-1">
              <span className="text-2xl text-text mr-1">
                Profile Visability:{' '}
              </span>

              <div className="flex justify-around ">
                <button
                  style={activeStyle.public}
                  className="px-2  mx-1 active:bg-red-500 border-second hover:bg-red-500  hover:text-white hover:shadow"
                  onClick={() => visability(false)}
                  disabled={!privateStatus}
                >
                  Public
                </button>
                <button
                  style={activeStyle.private}
                  className="px-2 mx-1 active:bg-red-500 border-second hover:bg-red-500  hover:text-white hover:shadow"
                  onClick={() => visability(true)}
                  disabled={privateStatus}
                >
                  Private
                </button>
              </div>
            </div>
            <div className="truncate w-full sm:w-1/2 my-1 ">
              <span className=" text-2xl text-text">Username: </span>

              <span className="text-neutral-200 text-xl mr-2 font-semibold  ">
                <EditFieldButton editFn={editName} />
                <span className="ml-2">{userName}</span>
              </span>

              {isEdit ? (
                <div>
                  <form
                    className="flex flex-col justify-center"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <input
                      placeholder={userName}
                      className="p-1 pl-2 "
                      {...register('userName', {
                        required: true,
                        maxLength: 32,
                        minLength: 2,
                      })}
                      type="text"
                    />
                    {errors.userName && (
                      <span className="text-red-400 text-center">
                        {errors.userName.message}
                      </span>
                    )}
                    <button
                      className="bg-gray-600 hover:bg-second hover:text-white px-3 py-1 mt-2 w-fit mx-auto"
                      type="submit"
                    >
                      Change
                    </button>
                  </form>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountInfo;
