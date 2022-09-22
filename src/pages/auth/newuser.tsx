import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
// import { useEffect } from 'react';

import { useSessionCheck } from '../../utils/session/checkSession';
// import { trpc } from '../../utils/trpc';

const NewUser: NextPage<{
  user:
    | ({
        id?: string | undefined;
      } & {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      })
    | undefined;
}> = ({ user }) => {
  const imageSrc = user?.image || '/images/user/default-user.png';
  // const userId = user?.id;
  useSessionCheck(true);

  // const { mutate, error } = trpc.useMutation(['account.create-profile'], {
  //   onError: (error) => {
  //     console.log(error);
  //   },
  //   onSuccess: () => {},
  // });

  // useEffect(() => {
  //   if (userId) mutate();
  // }, [userId]);

  const userPic = (
    <Image
      alt="User image"
      src={imageSrc}
      height={60}
      width={60}
      layout="fixed"
      className="rounded-full"
    />
  );

  // if (error) {
  //   return (
  //     <div className="h-screen grid place-items-center">
  //       <div className="text-red-300">
  //         <span className="text-red-400 font-bold text-3xl">
  //           Error has occured while creating your profile
  //         </span>
  //         <span>{error.message}</span>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="h-screen grid place-items-center bg-background">
      <div className="text-center">
        <h1 className=" text-5xl">Thank you for joining</h1>

        <Link href="/account">
          <a>
            <div
              className="flex justify-center items-center duration-300   border-2 p-2 
          rounded-full border-gray-300 w-fit mx-auto my-4 hover:border-main hover: cursor-pointer"
            >
              <span className="h-fit text-2xl truncate m-4">{user?.name}</span>
              {userPic}
            </div>
          </a>
        </Link>

        <p className=" text-3xl mt-3">
          You can now have full user access to the website -{' '}
          <Link href="/">
            <a className="underline text-second">Home</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NewUser;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const sess = await getSession(ctx);
  const user = sess?.user;

  return {
    props: {
      user,
    },
  };
};
