import Image from 'next/image';

const MainLogo: React.FC<{ h: number; w: number }> = ({ h, w }) => {
  return (
    <div className="h-fit w-fit">
      <Image
        alt="Main Logo"
        src="/images/logos/mainlogo.svg"
        height={h}
        width={w}
        layout="fixed"
      />
    </div>
  );
};

export default MainLogo;
