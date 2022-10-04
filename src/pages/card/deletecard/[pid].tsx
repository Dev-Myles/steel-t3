import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Card from '../../../components/cards/Card';
import ICard from '../../../types/card';
import { trpc } from '../../../utils/trpc';

const DeleteCardPage: React.FC<{ card: ICard }> = ({ card }) => {
  const links = card.links ? card.links : { github: '', website: '' };
  const router = useRouter();
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

  const { mutate, error } = trpc.useMutation('account.delete-card', {
    onSuccess: () => router.push('/card/carddeleted'),
  });

  return (
    <div className="mx-auto min-h-screen text-center   py-20">
      {error && <h1 className="text-xl mb-5 text-red-400">{error.message}</h1>}
      <h1 className="text-3xl mb-5 text-red-400">
        Are you sure you want to delete this card? This cannot be undone.
      </h1>
      <div className="flex justify-around mb-5">
        <button
          onClick={() => router.push('/account/cards')}
          className="text-blue-500 w-[110px] text-xl border-2 hover:border-blue-700 hover:text-blue-700 border-blue-500 rounded-xl p-1"
        >
          Back
        </button>
        <button
          onClick={() => mutate(card.id)}
          className="text-red-500 w-[110px] text-xl border-2 hover:border-red-700 hover:text-red-700 border-red-500 rounded-xl p-1"
        >
          DELETE
        </button>
      </div>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const sess = await getSession(ctx);
  const prisma = new PrismaClient();
  if (!sess) {
    await prisma.$disconnect();

    return {
      redirect: {
        destination: '/auth/signin',
      },
      props: {},
    };
  }
  const userId = sess.user?.id;
  const id = ctx.params?.pid as string;

  const user = await prisma.profile.findUnique({
    where: {
      userId,
    },
  });

  const card = await prisma.card.findUnique({
    where: {
      id,
    },
  });

  const cardCreator = card?.creatorId;

  if (user?.userName !== cardCreator) {
    await prisma.$disconnect();
    console.log('not working');
    return {
      redirect: {
        destination: '/',
      },
      props: {},
    };
  }

  return {
    props: {
      card,
    },
  };
};

export default DeleteCardPage;
