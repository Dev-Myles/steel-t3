export interface INavbar {}
import Link from 'next/link';

const Navbar: React.FC<INavbar> = () => {
  return (
    <div className="flex flex-row justify-between bg-cyan-600 text-white text-2xl">
      <div className="p-2 hover:text-cyan-200  ease-in-out duration-300 cursor-pointer">
        <Link href="/">
          <a>Logo</a>
        </Link>
      </div>
      <div className="flex flex-row justify-around w-fit">
        <div className="p-2 hover:text-cyan-200   ease-in-out duration-300 cursor-pointer">
          <Link href="/login">
            <a>Login</a>
          </Link>
        </div>
        <div className="p-2 mr-8 ml-8 hover:text-cyan-200   ease-in-out duration-300 cursor-pointer">
          <Link href="/create-account">
            <a>Register</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
