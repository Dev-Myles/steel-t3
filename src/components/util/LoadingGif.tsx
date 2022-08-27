import Image from 'next/image';

export const LoadingGif: React.FC = () => {
  return (
    <div className="h-screen grid place-items-center">
      <Image
        src="/gifs/loading.svg"
        alt="Loading"
        layout="fixed"
        height={100}
        width={100}
      />
    </div>
  );
};
