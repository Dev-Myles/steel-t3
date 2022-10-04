import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import FormHelper from '../../../components/forms/create-card/FormHelper';
import EditCardForm from '../../../components/forms/edit-card/EditCardForm';
import ICard from '../../../types/card';

const EditCardPage: React.FC<{ card: ICard }> = ({ card }) => {
  return (
    <div className="flex flex-col lg:flex-row-reverse justify-center mb-5">
      <FormHelper />
      <EditCardForm card={card} />
    </div>
  );
};

export default EditCardPage;

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
    include: {
      links: true,
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
