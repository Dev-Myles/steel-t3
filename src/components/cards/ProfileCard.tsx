import { Card, Links } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillTwitterCircle,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineProfile,
  AiOutlineYoutube,
} from 'react-icons/ai';
import { MdBusiness } from 'react-icons/md';
import { TbBrandDiscord } from 'react-icons/tb';

const ProfileCard: React.FC<{
  active: boolean;
  userName: string;
  imageSrc: string | null;
  cards: Card[];
  links: Links | null;
}> = ({ userName, cards, links, imageSrc, active }) => {
  const totalCards = cards.length ? cards.length.toString() : 'none';
  const colors = {
    github: 'bg-[#171515]',
    facebook: 'bg-[#3b5998]',
    portfolio: 'bg-[#47bf4f]',
    instagram: 'bg-[#cd486b]',
    youtube: 'bg-[#FF0000]',
    discord: 'bg-[#5865F2]',
    twitter: 'bg-[#1DA1F2]',
    company: 'bg-[#c9552e]',
    linkedin: 'bg-[#0A66C2]',
  };

  const LinkBubble: React.FC<{
    link: string | undefined;
    color: string;
    icon: ReactElement;
    active: boolean;
  }> = ({ link, color, icon, active }) => {
    if (!link) {
      return null;
    }
    if (link.length < 5) {
      return null;
    }

    if (!active) {
      return (
        <div
          className={`${color} text-white rounded-full mx-2 p-3 border-[1px] border-silver`}
        >
          {icon}
        </div>
      );
    }

    return (
      <a
        href={`//${link}`}
        className={`${active ? null : 'pointer-events-none'}`}
      >
        <div
          className={`${color} hover:scale-105 ease-in-out duration-200 text-white rounded-full mx-2 p-3 border-[1px] border-silver`}
        >
          {icon}
        </div>
      </a>
    );
  };

  const CardLink: React.FC<{ active: boolean }> = ({ active }) => {
    if (!active) {
      return (
        <div className="ml-5">
          <span>{totalCards} Cards</span>
        </div>
      );
    }

    return (
      <Link href={`/profile/${userName}/cards`}>
        <a className="ml-5">
          <div>
            <span className="underline hover:text-second">
              View {totalCards} Cards
            </span>
          </div>
        </a>
      </Link>
    );
  };

  const Links: React.FC = () => {
    return (
      <div className="flex mt-2 flex-wrap justify-center">
        <LinkBubble
          key={uuidv4()}
          link={links?.github}
          color={colors.github}
          icon={<AiFillGithub />}
          active={active}
        />
        <LinkBubble
          key={uuidv4()}
          link={links?.facebook}
          color={colors.facebook}
          icon={<AiFillFacebook />}
          active={active}
        />
        <LinkBubble
          key={uuidv4()}
          link={links?.portfolio}
          color={colors.portfolio}
          icon={<AiOutlineProfile />}
          active={active}
        />
        <LinkBubble
          key={uuidv4()}
          link={links?.instagram}
          color={colors.instagram}
          icon={<AiOutlineInstagram />}
          active={active}
        />
        <LinkBubble
          key={uuidv4()}
          link={links?.youtube}
          color={colors.youtube}
          icon={<AiOutlineYoutube />}
          active={active}
        />
        <LinkBubble
          key={uuidv4()}
          link={links?.discord}
          color={colors.discord}
          icon={<TbBrandDiscord />}
          active={active}
        />
        <LinkBubble
          key={uuidv4()}
          link={links?.twitter}
          color={colors.twitter}
          icon={<AiFillTwitterCircle />}
          active={active}
        />
        <LinkBubble
          key={uuidv4()}
          link={links?.company}
          color={colors.company}
          icon={<MdBusiness />}
          active={active}
        />
        <LinkBubble
          key={uuidv4()}
          link={links?.linkedin}
          color={colors.linkedin}
          icon={<AiOutlineLinkedin />}
          active={active}
        />
      </div>
    );
  };

  return (
    <div className="bg-black p-3 m-1  sm:w-fit rounded-2xl border-[1px] border-second">
      <div className="flex border-b-[1px] pb-2 justify-between  items-center border-second">
        <div className="h-fit ml-2 font-Poppins flex items-center">
          {imageSrc ? (
            <Image
              className="rounded-full"
              src={imageSrc}
              alt="Profile image"
              height={40}
              width={40}
              layout="fixed"
            />
          ) : null}

          <span className="pl-2">{userName}</span>
        </div>

        <CardLink active={active} />
      </div>
      {Links.length ? (
        <Links />
      ) : (
        <h3 className="text-second text-center pt-2 px-4">
          Profile has no links
        </h3>
      )}
    </div>
  );
};

export default ProfileCard;
