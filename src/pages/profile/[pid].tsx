import { Card, CardLinks, Links, PrismaClient, Profile } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import ProfileCard from '../../components/cards/ProfileCard';

const ProfilePage: NextPage<{
  data:
    | (Profile & {
        cards: (Card & {
          links: CardLinks | null;
        })[];
        links: Links;
        user: {
          image: string | null;
        };
      })
    | null
    | undefined;
}> = ({ data }) => {
  if (!data?.userId) {
    return (
      <div className="min-h-screen flex">
        <div className="text-center h-fit mt-28 text-3xl  shadow-md shadow-second/60 w-fit mx-auto rounded-lg  bg-panel p-3 sm:p-8">
          <h1 className="text-red-500">User not found</h1>
        </div>
      </div>
    );
  }

  if (data?.private) {
    return (
      <div className="min-h-screen  flex">
        <div className="text-center border-t-[1px] border-slate-900 h-fit mt-28 text-3xl shadow-md shadow-second/60 w-fit mx-auto rounded-lg  bg-panel p-3 sm:p-8">
          <h1 className="text-second">This profile is private</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="w-fit mx-auto my-32">
        <ProfileCard
          active={true}
          userName={data?.userName}
          imageSrc={data?.user.image}
          cards={data?.cards}
          links={data?.links}
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
