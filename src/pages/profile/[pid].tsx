import { PrismaClient } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UserImage from '../../components/util/UserImage';
import IProfile from '../../types/profile';

const ProfilePage: NextPage<{ profile: IProfile }> = ({ profile }) => {
  const mappedLinks = [
    ['Company', profile.links.company],
    ['LinkedIn', profile.links.linkedin],
    ['Github', profile.links.github],
    ['Youtube', profile.links.youtube],
    ['Portfolio', profile.links.portfolio],
    ['Instagram', profile.links.instagram],
    ['Twitter', profile.links.twitter],
    ['Facebook', profile.links.facebook],
    ['Discord', profile.links.discord],
  ];

  const cards = profile.cards.length ? profile.cards : [];

  const UsersCards: React.FC = () => {
    const cardsLeft = cards.length - 3;

    function mapCards() {
      if (cards.length === 0) {
        return (
          <div>
            <span>This user hasn&apos;t created any cards.</span>
          </div>
        );
      }

      if (cards.length > 3) {
        return cards.slice(0, 3).map((card) => {
          return (
            <Link key={uuidv4()} href={`/card/${card.id}`}>
              <a>
                <div
                  key={uuidv4()}
                  className="bg-gradient-to-r from-emerald-900 text-emerald-200 flex items-center justify-center m-2 w-28 h-32 text-center p-2 border-2 sm:w-40 border-emerald-600 shadow-lg truncate  rounded-lg"
                >
                  <span className="truncate text-xl">{card.name}</span>
                </div>
              </a>
            </Link>
          );
        });
      }

      return cards.map((card) => {
        return (
          <Link key={uuidv4()} href={`/card/${card.id}`}>
            <a>
              <div
                className="bg-gradient-to-r from-emerald-800 flex items-center justify-center m-2 w-28 h-32
              p-2 border-2 sm:w-40 border-emerald-600 shadow truncate  rounded-lg"
              >
                <span className="truncate text-xl">{card.name}</span>
              </div>
            </a>
          </Link>
        );
      });
    }

    return (
      <div className="flex flex-wrap items-center sm:justify-center">
        {mapCards()}
        {cardsLeft > 0 ? (
          <Link href={`/profile/${profile.userName}/cards`}>
            <a>
              <span className="text-2xl ">{cardsLeft} more...</span>
            </a>
          </Link>
        ) : null}
      </div>
    );
  };

  const UsersImage: React.FC = () => {
    if (!profile.user.image) {
      return <UserImage />;
    }

    return (
      <div className="flex justify-center m-8">
        <Image
          className="rounded-full "
          src={profile.user.image}
          alt="User image"
          height={150}
          width={150}
          layout="fixed"
        />
      </div>
    );
  };

  const Links: React.FC = () => {
    let links: ReactNode[] = [];
    mappedLinks.map((e) => {
      const link = e[1];

      if (link !== 'none') {
        return links.push(
          <a
            href={`//${link}`}
            className="p-2 m-2 bg-gradient-to-r  w-[155px] from-slate-800 hover:bg-black border-second border-2 rounded-xl text-indigo-300 hover:text-indigo-400 ease-in-out duration-300 hover:border-indigo-600"
            key={uuidv4()}
          >
            <div className="truncate">
              <span className="block text-xl">{e[0]}</span>
              <span>{link}</span>
            </div>
          </a>
        );
      } else {
        return;
      }
    });

    if (!links.length) {
      return <span>This user has no links.</span>;
    }

    return (
      <div className="flex flex-wrap justify-start sm:justify-center">
        {links}
      </div>
    );
  };

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
    <div className="min-h-screen w-screen">
      <div
        className="mx-auto bg-panel rounded-xl p-4 w-screen sm:w-fit
      "
      >
        <div>
          <h1 className="text-3xl mb-2">Profile</h1>
          <div className="truncate">
            <span className="text-lg ">User- </span>
            <span className="text-xl text-main">{profile.userName}</span>
          </div>
          <UsersImage />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl">Cards: {cards.length}</h3>
            <Link href={`/profile/${profile.userName}/cards`}>
              <a>
                <span className="hover:underline underline-offset-4 text-sm">
                  View all
                </span>
              </a>
            </Link>
          </div>
          <UsersCards />
        </div>
        <div className="mt-4">
          <h3 className="text-2xl">Links</h3>
          <Links />
        </div>
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

  return {
    props: {
      profile,
    },
  };
};

export default ProfilePage;
