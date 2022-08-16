import { useSession } from 'next-auth/react';
import Image from 'next/image';
import defaultUserPic from '../../public/images/user/default-user.png';

export const UserImage: React.FC<{
  h?: number;
  w?: number;
}> = ({ h = 70, w = 70 }) => {
  const { data: session } = useSession();
  const imageUrl = session?.user?.image || defaultUserPic;

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
