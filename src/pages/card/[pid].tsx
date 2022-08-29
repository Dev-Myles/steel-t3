import { PrismaClient } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

import Card from '../../components/cards/Card';

interface CardType {
  creatorId: string;
  likedBy: string[];
  private: boolean;
  name: string;
  projectType: string;
  level: string;
  openSource: boolean;
  description: string;
  uses: string;
}

export const CardPage: NextPage<{ card: CardType }> = ({ card }) => {
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
    });
  }

  return {
    props: {
      card,
    },
  };
};

export default CardPage;
