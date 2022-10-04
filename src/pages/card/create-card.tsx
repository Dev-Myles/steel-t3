import { PrismaClient } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import CreateCardForm from '../../components/forms/create-card/CreateCardForm';
import FormHelper from '../../components/forms/create-card/FormHelper';

export const CreateCard: NextPage<{
  profileUsername: { userName: string };
}> = ({ profileUsername }) => {
  return (
    <div className="flex flex-col justify-center lg:flex-row-reverse min-h-screen">
      <FormHelper />

      <CreateCardForm userName={profileUsername.userName} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const sess = await getSession(ctx);
  if (!sess) {
    return {
      redirect: {
        destination: '/auth/signin',
      },
      props: {},
    };
  }

  const userId = sess?.user?.id;
  let profileUsername;
  const prisma = new PrismaClient();

  if (userId) {
    profileUsername = await prisma?.profile.findUnique({
      where: {
        userId,
      },
      select: {
        userName: true,
      },
    });
  }
  await prisma.$disconnect();

  return {
    props: {
      profileUsername,
    },
  };
};

export default CreateCard;
