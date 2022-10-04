import Link from 'next/link';

const CardDeletedPage: React.FC = () => {
  return (
    <div className="h-screen grid place-content-center">
      <h1 className="text-red-500 text-3xl">The card has been deleted.</h1>
      <Link href={'/'}>
        <a className="text-center mt-4 text-2xl underline text-second">Home</a>
      </Link>
    </div>
  );
};

export default CardDeletedPage;
