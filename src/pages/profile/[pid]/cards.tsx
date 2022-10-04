import { Card, CardLinks, PrismaClient, Profile } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import { ActionType, mapCardsLink } from '../../../components/util/mapCards';

const ProfileCards: NextPage<{
  data:
    | (Profile & {
        user: { image: string | null };
        cards: (Card & { links: CardLinks | null })[];
      })
    | null;
}> = ({ data }) => {
  const cards = data?.cards;
  function mapCards() {
    if (!cards?.length) {
      return (
        <div className=" grid place-content-center">
          <h3 className="text-2xl p-2 text-center mt-32 text-red-400">
            User has no Cards
          </h3>
        </div>
      );
    }
    return mapCardsLink(cards, ActionType.none);
  }

  return (
    <div className="min-h-screen">
      <div className="my-8 pb-8 ">
        <h1 className="  mt-3 lg:mx-16  text-center  rounded-lg text-second  text-xl sm:text-3xl">
          {data?.userName}&apos;s Cards
        </h1>

        <div className="flex flex-wrap justify-center">{mapCards()}</div>
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
        cards: {
          where: {
            private: false,
          },
          include: {
            links: true,
          },
        },
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

export default ProfileCards;
