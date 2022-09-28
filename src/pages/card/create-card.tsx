import { PrismaClient } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import CreateCardForm from '../../components/forms/create-card/CreateCardForm';

export const CreateCard: NextPage<{
  profileUsername: { userName: string };
}> = ({ profileUsername }) => {
  const FormHelper: React.FC = () => {
    return (
      <div className="bg-panel rounded-xl  p-2 shadow lg:w-1/4 h-fit mt-8 sm:ml-4">
        <h3 className="text-center text-2xl">Tips & How to</h3>
        <p className="mt-2">
          <span className="block text-xl font-bold text-main">Name-</span>
          Straight forward: your project name! If it is already taken... Get
          creative.
        </p>
        <p className="mt-2">
          <span className="block text-xl font-bold text-main">
            Description-
          </span>
          Here is the meat of your card. Your card&apos;s description is where
          you should put all the points you want to cover if someone should
          happen to ask you about your project or what you do. Don&apos;t write
          an essay but think about how you would present your project to a 5th
          grader. Don&apos;t be super technical.
        </p>
        <p className="mt-2">
          <span className="block text-xl font-bold text-main">
            Private Status-
          </span>
          Select whether or not you want your card to be searchable on the site
          or viewable on your profile. People will be able to see the card
          through a direct link whether or not it public or private to make
          sharing it easy with others.
        </p>
        <p className="mt-2">
          <span className="block text-xl font-bold text-main">Level-</span>
          Is this a professional site with aims of providing a service, a
          passion project, or something to show off your skills?
        </p>
        <p className="mt-2">
          <span className="block text-xl font-bold text-main">
            Open or Closed Source-
          </span>
          Can anyone fork, view, or contribute to your project?
        </p>
        <p className="mt-2">
          <span className="block text-xl font-bold text-main">
            Project Type-
          </span>
          What kind of project is this, a game, site, bot, etc?
        </p>
        <p className="mt-2">
          <span className="block text-xl font-bold text-main">Uses-</span>
          What are the intended uses for this project? Why would the user want
          to use?
        </p>
        <p className="mt-2">
          <span className="block text-xl font-bold text-main">Link-</span>
          Add links to the project&apos;s main site and/or code repository.
        </p>
        <p className="mt-2">
          <span className="block text-xl font-bold text-main">Tags</span>
          Descriptive one word tags used to search/describe your project.
        </p>
      </div>
    );
  };
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
