import { PrismaClient } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import ProfileCard from '../../components/cards/ProfileCard';
import IProfile from '../../types/profile';

const ProfilePage: NextPage<{ profile: IProfile }> = ({ profile }) => {
  const cards = profile.cards.length ? profile.cards : [];

  if (!profile) {
    return (
      <div className="min-h-screen grid place-content-center">
        <div className="text-center rounded-lg bg-panel p-4">
          <h1 className="text-red-500">User not found</h1>
        </div>
      </div>
    );
  }

  if (profile.private) {
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
          userName={profile.userName}
          imageSrc={profile.user.image}
          cards={profile.cards}
          links={profile.links}
        />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pid = context.params;
  const userName = pid?.pid as string;
  let profile;
  const prisma = new PrismaClient();

  if (userName) {
    profile = await prisma?.profile.findUnique({
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
      profile,
    },
  };
};

export default ProfilePage;
