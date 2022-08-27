import { useSession } from 'next-auth/react';
import Image from 'next/image';

export const UserImage: React.FC<{
  h?: number;
  w?: number;
}> = ({ h = 70, w = 70 }) => {
  const { data: session } = useSession();
  const imageUrl = session?.user?.image || '/images/user/default-user.png';

  return (
    <Image
      src={imageUrl}
      alt="User Image"
      height={h}
      width={w}
      layout="fixed"
      className="rounded-full"
    />
  );
};

export default UserImage;
