import { PrismaClient } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import ProfileCard from '../../components/cards/ProfileCard';
import IProfile from '../../types/profile';

const ProfilePage: NextPage<{ data: IProfile }> = ({ data }) => {
  if (!data.profile) {
    return (
      <div className="min-h-screen grid place-content-center">
        <div className="text-center rounded-lg bg-panel p-4">
          <h1 className="text-red-500">User not found</h1>
        </div>
      </div>
    );
  }

  if (data.profile?.private) {
    return (
      <div className="min-h-screen grid place-content-center">
        <div className="text-center rounded-lg bg-panel p-4">
          <h1>This profile is private</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="w-fit mx-auto my-32">
        <ProfileCard
          active={true}
          userName={data.profile?.userName}
          imageSrc={data.profile?.user.image}
          cards={data.profile?.cards}
          links={data.profile?.links}
        />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pid = context.params;
  const userName = pid?.pid as string;
  let data;
  const prisma = new PrismaClient();

  if (userName) {
    data = await prisma?.profile.findUnique({
      where: {
        userName,
      },
      include: {
        links: true,
        cards: true,
        user: {
          select: {
            image: true,
          },
        },
      },
    });
  }
  await prisma.$disconnect();

  return {
    props: {
      data,
    },
  };
};

export default ProfilePage;
