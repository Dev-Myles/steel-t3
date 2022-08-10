import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const NewUser: NextPage<any> = () => {
  const { data: session } = useSession();
  const name = session?.user?.name;
  const pic = session?.user?.image;
  return (
    <div className="h-screen grid place-items-center">
      <div className="text-center">
        <h1 className="text-cyan-700 text-5xl">Thank you for signing up,</h1>

        {pic ? (
          <Link href="/account">
            <a>
              <div
                className="flex justify-center items-center duration-300  text-cyan-700 border-2 p-2 
          rounded-full border-gray-300 w-fit mx-auto my-4 hover:border-cyan-700 hover: cursor-pointer"
              >
                <span className="h-fit text-4xl m-4">{name}</span>

                <Image
                  alt="User image"
                  src={pic}
                  height={60}
                  width={60}
                  layout="fixed"
                  className="rounded-full"
                />
              </div>
            </a>
          </Link>
        ) : null}

        <p className="text-cyan-600 text-3xl mt-3">
          You can now have full user access to the website{' '}
          <Link href="/">
            <a className="underline">Home</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NewUser;
