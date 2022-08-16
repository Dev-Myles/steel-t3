import Image from 'next/image';
import loadingGif from '../../public/gifs/loading.svg';

export const LoadingGif: React.FC = () => {
  return (
    <div className="h-screen grid place-items-center">
      <Image
        src={loadingGif}
        alt="Loading"
        layout="fixed"
        height={100}
        width={100}
      />
    </div>
  );
};
