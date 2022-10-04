import Image from 'next/image';

export const LoadingGif: React.FC = () => {
  return (
    <div className=" grid bg-inherit place-items-center">
      <Image
        src="/gifs/785.svg"
        alt="Loading"
        layout="fixed"
        height={100}
        width={100}
      />
    </div>
  );
};
