export interface INavbar {}
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar: React.FC<INavbar> = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-row text-cyan-600 justify-between border-b-2  text-2xl">
      <div className="p-2 [&>*:hover]:text-cyan-700 [&>*]:ease-in-out duration-300cursor-pointer">
        <Link href="/">
          <a>Logo</a>
        </Link>
      </div>
      {session ? (
        <div className="flex flex-row justify-around w-fit [&>*:hover]:text-cyan-700 [&>*]:ease-in-out duration-300">
          <div onClick={() => signOut()} className="p-2 cursor-pointer">
            <Link href="/auth/signout">
              <a>Sign Out</a>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-around w-fit [&>*:hover]:text-cyan-700 [&>*]:ease-in-out duration-300">
          <div className="p-2 cursor-pointer">
            <Link href="/auth/signin">
              <a>Sign In/Up</a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
