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
    <div className="w-full   p-2  h-fit">
      <h1 className="text-center font-bold text-5xl text-second">
        Account Info
      </h1>
      {isLoading ? (
        <LoadingGif />
      ) : (
        <div className="flex flex-col lg:p-8 p-4 justify-around  ">
          <div className="mx-auto">
            <UserImage />
          </div>
          <div>
            <div className="m-3">
              <span className=" font-bold text-4xl text-second">Name</span>
              <span className="block font-semibold text-xl truncate">
                {name}
              </span>
            </div>
            <div className="m-3 border-b-[1px] border-slate-900 pb-5">
              <span className=" font-bold text-4xl text-second">Email</span>
              <span className="block font-semibold text-xl truncate">
                {email}
              </span>
            </div>

            <div className="lg:flex lg:justify-between [&>*]:inline-block [&>*]:m-3 [&>*]:text-start ">
              <div className="font-bold w-72">
                <span className=" text-xl text-second">
                  Username <EditFieldButton editFn={editName} />
                </span>
                <br />
                <span>{userName}</span>
                {isEdit ? (
                  <div>
                    <form
                      className="flex flex-col justify-center"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <input
                        className="w-[90%]"
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
                        className="bg-gray-600 px-3 py-1 mt-2 w-fit mx-auto"
                        type="submit"
                      >
                        Change
                      </button>
                    </form>
                  </div>
                ) : null}
              </div>
              <div className="font-bold">
                <span className=" text-xl text-second">Profile Visability</span>
                <br />

                <div className="flex justify-around">
                  <button
                    style={activeStyle.public}
                    className="px-2 active:bg-red-500 border-second hover:bg-red-500 hover:border-red-500 hover:text-white hover:shadow"
                    onClick={() => visability(false)}
                    disabled={!privateStatus}
                  >
                    Public
                  </button>
                  <button
                    style={activeStyle.private}
                    className="px-2 active:bg-red-500 border-second hover:bg-red-500 hover:border-red-500 hover:text-white hover:shadow"
                    onClick={() => visability(true)}
                    disabled={privateStatus}
                  >
                    Private
                  </button>
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
