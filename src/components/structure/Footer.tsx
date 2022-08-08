export interface IFooter {}
import Link from 'next/link';

const Footer: React.FC<IFooter> = () => {
  return (
    <footer className="border-t-2 text-cyan-600 h-fit ">
      <div className="flex flex-col lg:flex-row justify-between text-lg">
        <div className="p-6 mx-auto lg:mx-0 text-3xl">
          <span>Logo</span>
        </div>
        <div className="p-2">
          <ul className="text-center [&>*:hover]:text-cyan-700 [&>*]:ease-in-out duration-300 cursor-pointer [&>*]:inline-block [&>*]:p-4">
            <Link href="/account">
              <a>
                <li>Account</li>
              </a>
            </Link>
            <Link href="/search">
              <a>
                <li>Search</li>
              </a>
            </Link>
            <Link href="/policy">
              <a>
                <li>Policy</li>
              </a>
            </Link>
            <Link href="/about">
              <a>
                <li>About</li>
              </a>
            </Link>
            <Link href="/contact">
              <a>
                <li>Contact</li>
              </a>
            </Link>
          </ul>
        </div>
      </div>

      <div className="text-center pt-4 pb-8">
        <span>@2022 CodeCards. All Rights Reserved</span>
      </div>
    </footer>
  );
};

export default Footer;