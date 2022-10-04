import { AnimatePresence, motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { FaRegIdCard } from 'react-icons/fa';
import { GoSignIn } from 'react-icons/go';
import { MdOutlineAccountCircle, MdOutlineCreate } from 'react-icons/md';
import { VscSignOut } from 'react-icons/vsc';
import MainLogo from '../util/MainLogo';
import UserImage from '../util/UserImage';

const Navbar: React.FC = () => {
  const [isHover, setHover] = useState(false);
  const [isMenu, setMenu] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;

  const name = user?.name;
  // const redirectUrl = 'http://localhost:3000/auth/signout';
  const redirectUrl = 'https://steel-t3.vercel.app/auth/signout';

  useEffect(() => {
    const body = document?.querySelector('body');
    if (body) body.style.overflow = isMenu ? 'hidden' : 'auto';
  }, [isMenu]);

  const User: React.FC = () => {
    if (isMobile) {
      return (
        <Link href="/account">
          <a className=" h-fit w-fit flex mr-5 justify-center items-center">
            <span className="text-gray-400 text-xs w-fit p-3 text-center">
              Signed in as: <br />
              <span className="text-main font-bold text-sm">{name}</span>
            </span>
            <div
              className={
                isHover
                  ? 'border-2 border-main rounded-full h-fit grid place-content-center'
                  : 'border-2 border-[#14161c]  rounded-full h-fit grid place-content-center'
              }
            >
              <UserImage h={40} w={40} />
            </div>
          </a>
        </Link>
      );
    }

    return (
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="z-10"
      >
        <Link href="/account">
          <a className=" h-fit w-fit flex mr-5 justify-center items-center">
            <span className="text-gray-400 text-xs w-fit p-3 text-center">
              Signed in as: <br />
              <span className="text-main font-bold text-sm">{name}</span>
            </span>
            <div
              className={
                isHover
                  ? 'border-2 border-main rounded-full h-fit grid place-content-center'
                  : 'border-2 border-[#14161c]  rounded-full h-fit grid place-content-center'
              }
            >
              <UserImage h={40} w={40} />
            </div>
          </a>
        </Link>
        <AnimatePresence initial={false} />
        {isHover && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute bg-[#14161c] shadow  py-4 px-1 right-0 rounded-b-lg">
              <ul className="[&>*]:ease-in-out [&>*]:duration-200 [&>*:hover]:text-emerald-700 [&>*]:py-3 px-8">
                <li>
                  <Link href="/card/create-card">
                    <a onClick={() => setMenu(false)}>
                      <span className="flex items-center">
                        Create Card
                        <MdOutlineCreate />
                      </span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/account/cards">
                    <a onClick={() => setMenu(false)}>
                      <span className="flex items-center">
                        Cards
                        <FaRegIdCard />
                      </span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/account">
                    <a onClick={() => setMenu(false)}>
                      <span className="flex items-center">
                        Account
                        <MdOutlineAccountCircle />
                      </span>
                    </a>
                  </Link>
                </li>
              </ul>
              <button
                className=" flex items-center mx-auto border-second border-2 hover:border-indigo-600 py-1 px-6  mt-4"
                onClick={() => signOut({ callbackUrl: `${redirectUrl}` })}
              >
                Sign Out
                <VscSignOut />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="flex  flex-row text-main justify-between place-items-center font-mono  text-2xl">
      {session ? (
        <div
          onClick={() => {
            isMenu ? setMenu(false) : setMenu(true);
          }}
          className="lg:hidden ml-3"
        >
          <AiOutlineMenu />
        </div>
      ) : null}

      <AnimatePresence initial={false} />
      {isMenu && (
        <div className="absolute h-screen z-20 top-0 left-0 flex flex-col  bg-panel ">
          <div
            onClick={() => setMenu(false)}
            className="p-2 mt-3 h-fit flex justify-between items-center "
          >
            <span>Menu</span>
            <AiOutlineClose />
          </div>
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col  h-full"
          >
            <ul className="w-screen h-1/2 flex  flex-col [&>*]:p-4 [&>*]:text-3xl">
              <li>
                <Link href="/card/create-card">
                  <a onClick={() => setMenu(false)}>
                    <span className="flex items-center">
                      Create Card
                      <MdOutlineCreate />
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/account/cards">
                  <a onClick={() => setMenu(false)}>
                    <span className="flex items-center">
                      Cards
                      <FaRegIdCard />
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/account">
                  <a onClick={() => setMenu(false)}>
                    <span className="flex items-center">
                      Account
                      <MdOutlineAccountCircle />
                    </span>
                  </a>
                </Link>
              </li>
            </ul>
            <button
              className="flex border-second border-2 items-center hover:border-indigo-600  mx-auto py-3 px-6  mb-4"
              onClick={() => signOut({ callbackUrl: `${redirectUrl}` })}
            >
              Sign Out
              <VscSignOut />
            </button>
          </motion.div>
        </div>
      )}

      <div className="p-2 [&>*:hover]:text-emerald-700 [&>*]:ease-in-out duration-300 cursor-pointer">
        <Link href="/">
          <a>
            <MainLogo h={50} w={50} />
          </a>
        </Link>
      </div>
      <Link href="/search">
        <a className="sm:ml-[50%]">
          <BsSearch />
        </a>
      </Link>
      {user ? (
        <User />
      ) : (
        <div className="flex mr-2 flex-row justify-around w-fit [&>*:hover]:text-emerald-700 [&>*]:ease-in-out duration-300">
          <Link href="/auth/signin">
            <a>
              <span className="flex text-sm sm:text-lg items-center">
                <GoSignIn />
                In/Out
              </span>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
