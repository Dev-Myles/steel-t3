import { PrismaClient } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import Card from '../../../components/cards/Card';
import IProfile from '../../../types/profile';

const ProfileCards: NextPage<{ profile: IProfile }> = ({ profile }) => {
  const cards = profile.cards;

  function mapCards() {
    if (!cards.length) {
      return (
        <div className=" grid place-content-center">
          <h3 className="text-2xl p-2 text-center">
            You have not created any cards
          </h3>
        </div>
      );
    }
    return cards.map((card) => {
      const links = card.links || { github: '', website: '' };
      return (
        <div key={uuidv4()} className="w-11/12 sm:w-1/4 mt-12">
          <Link href={`/card/${card.id}`}>
            <a>
              <Card
                cardId={card.id}
                projectType={card.projectType}
                creatorId={card.creatorId}
                privateStatus={card.private}
                name={card.name}
                likes={card.likedBy}
                level={card.level}
                openSource={card.openSource}
                description={card.description}
                uses={card.uses}
                stateStatus={false}
                links={links}
                tags={card.tags}
              />
            </a>
          </Link>
        </div>
      );
    });
  }

  return (
    <div className="min-h-screen">
      <div className="my-8">
        <h1 className=" mx-2 mt-3 sm:mx-8  text-xl sm:text-2xl">
          {profile.userName}&apos;s Cards
        </h1>

        <div className="flex flex-wrap justify-center">{mapCards()}</div>
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
      profile,
    },
  };
};

export default ProfileCards;
