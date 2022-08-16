import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import defaultUser from '../../public/images/user/default-user.png';
import { trpc } from '../../utils/trpc';

const NewUser: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/signin');
    },
  });
  const name = session?.user?.name;
  const pic = session?.user?.image;
  const id = session?.user?.id;
  const imageSrc = pic || defaultUser;
  const userId = id;

  const { mutate, error } = trpc.useMutation(['account.create-profile'], {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {},
  });

  useEffect(() => {
    if (userId) mutate();
  }, [userId]);

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

  if (error) {
    return (
      <div className="h-screen grid place-items-center">
        <div className="text-red-300">
          <span className="text-red-400 font-bold text-3xl">
            Error has occured while creating your profile
          </span>
          <span>{error.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen grid place-items-center">
      <div className="text-center">
        <h1 className="text-cyan-700 text-5xl">Thank you for signing up,</h1>

        <Link href="/account">
          <a>
            <div
              className="flex justify-center items-center duration-300  text-cyan-700 border-2 p-2 
          rounded-full border-gray-300 w-fit mx-auto my-4 hover:border-cyan-700 hover: cursor-pointer"
            >
              <span className="h-fit text-4xl m-4">{name}</span>
              {userPic}
            </div>
          </a>
        </Link>

        <p className="text-cyan-600 text-3xl mt-3">
          You can now have full user access to the website
          <Link href="/">
            <a className="underline">Home</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NewUser;
