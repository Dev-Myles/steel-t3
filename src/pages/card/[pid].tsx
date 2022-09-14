import { PrismaClient } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

import Card from '../../components/cards/Card';

import ICard from '../../types/card';

export const CardPage: NextPage<{ card: ICard }> = ({ card }) => {
  const links = card.links ? card.links : { github: '', website: '' };
  if (!card) {
    return (
      <div className="grid h-screen place-content-center">
        <h1 className="text-red-400 font-bold text-3xl">Card Not Found</h1>
        <Link href="/account/cards">
          <a className="text-center">
            <span className="text-gray-400 underline text-2xl">
              Go back to cards
            </span>
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen   w-screen py-20">
      <div className="mx-auto w-11/12">
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
          stateStatus={true}
          links={links}
          tags={card.tags}
        />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pid = context.params;
  const id = pid?.pid as string;
  let card;
  const prisma = new PrismaClient();

  if (id) {
    card = await prisma?.card.findUnique({
      where: {
        id,
      },
      include: {
        links: true,
      },
    });
  }

  await prisma.$disconnect();
  return {
    props: {
      card,
    },
  };
};

export default CardPage;
