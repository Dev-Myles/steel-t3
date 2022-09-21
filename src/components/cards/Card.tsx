import { CardLinks } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement, useReducer } from 'react';
import {
  AiFillGithub,
  AiFillHeart,
  AiOutlineMinus,
  AiOutlineTag,
} from 'react-icons/ai';
import { BiWrench } from 'react-icons/bi';
import { FiLink } from 'react-icons/fi';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { v4 as uuidv4 } from 'uuid';
import { LikeSchema } from '../../schema/like-schema';
import { useSessionCheck } from '../../utils/session/checkSession';
import { trpc } from '../../utils/trpc';
import { LoadingGif } from '../util/LoadingGif';

const initalState = { tab: 'MAIN' };

function reducer(state: { tab: string }, action: { type: string }) {
  switch (action.type) {
    case 'MAIN':
      return { tab: (state.tab = 'MAIN') };
    case 'DESC':
      return { tab: (state.tab = 'DESC') };
    case 'USES':
      return { tab: (state.tab = 'USES') };
    case 'TAGS':
      return { tab: (state.tab = 'TAGS') };
    default:
      throw new Error();
  }
}

export const Card: React.FC<{
  projectType: string;
  creatorId: string;
  privateStatus: boolean;
  name: string;
  likes: string[];
  level: string;
  cardId: string;
  openSource: boolean;
  description: string;
  uses: string;
  stateStatus: boolean;
  tags: string[];
  links: CardLinks | { github: string; website: string };
}> = ({
  projectType,
  creatorId,
  privateStatus,
  name,
  cardId,
  likes,
  level,
  tags,
  openSource,
  description,
  uses,
  stateStatus,
  links,
}) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  const { isLoading, data } = trpc.useQuery(['search.get-profile-id'], {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const { mutate } = trpc.useMutation(['card.like-card']);

  function likeCard(data: LikeSchema) {
    if (!sess.session) {
      return;
    } else {
      mutate(data);
      window.location.reload();
    }
  }

  const sess = useSessionCheck(false);

  if (isLoading) {
    return <LoadingGif />;
  }

  const liked = data?.id ? likes.includes(data.id) : false;

  const imageMap = new Map([
    ['WEBSITE', '/images/card-pics/website.svg'],
    ['WEBAPP', '/images/card-pics/webapp.svg'],
    ['VIDEOGAME', '/images/card-pics/videogame.svg'],
    ['FRAMEWORK', '/images/card-pics/framework.svg'],
    ['APPLICATION', '/images/card-pics/application.svg'],
    ['CRYPTO', '/images/card-pics/crypto.svg'],
    ['ALGORITHM', '/images/card-pics/algorithm.svg'],
    ['AI', '/images/card-pics/ai.svg'],
    ['PACKAGE', '/images/card-pics/package.svg'],
    ['LIBRARY', '/images/card-pics/library.svg'],
    ['OS', '/images/card-pics/os.svg'],
    ['BOT', '/images/card-pics/bot.svg'],
    ['LANGUAGE', '/images/card-pics/language.svg'],
    ['OTHER', '/images/card-pics/other.svg'],
    ['SCRIPT', '/images/card-pics/script.svg'],
  ]);

  const imageSrc = `${imageMap.get(projectType)}`;

  const LikeButton: React.FC = () => {
    return (
      <button
        className="border-none shadow-none hover:border-none hover:shadow-none hover:bg-inherit "
        disabled={sess.session ? false : true}
        onClick={() => likeCard({ liked: liked, cardId: cardId })}
      >
        <span
          className={`${
            liked ? 'text-red-900' : 'text-red-400'
          }  font-bold h-fit flex items-center justify-center`}
        >
          {likes.length} <AiFillHeart className="inline" />
        </span>
      </button>
    );
  };

  const CardButtons: React.FC<{ stateStatus: boolean }> = ({ stateStatus }) => {
    return (
      <>
        <SeeMore
          color="bg-zinc-400"
          icon={<HiOutlineMenuAlt2 />}
          stateStatus={stateStatus}
          type={'DESC'}
          name="Description"
        />

        <SeeMore
          icon={<BiWrench />}
          color="bg-amber-500"
          stateStatus={stateStatus}
          type={'USES'}
          name="Uses"
        />

        <SeeMore
          color="bg-blue-600"
          icon={<AiOutlineTag />}
          stateStatus={stateStatus}
          name="Tags"
          type={'TAGS'}
        />
      </>
    );
  };

  const OutSideLinks: React.FC<{ stateStatus: boolean }> = ({
    stateStatus,
  }) => {
    if (!stateStatus) {
      return (
        <>
          {links?.website?.length ? (
            <div className="flex items-center hover:cursor-pointer ">
              <div className="bg-lime-500 border-gray-200 border-2 rounded-full p-2 text-white shadow">
                <FiLink />
              </div>
            </div>
          ) : null}

          {links?.github?.length ? (
            <div className="flex items-center hover:cursor-pointer ">
              <div className="bg-black border-gray-200 border-2 rounded-full p-2 text-white shadow ">
                <AiFillGithub />
              </div>
            </div>
          ) : null}

          <CardButtons stateStatus={stateStatus} />
        </>
      );
    }

    return (
      <>
        {links.website?.length ? (
          <div className="flex items-center hover:cursor-pointer ">
            <a href={`//${links.website}`}>
              <div className="bg-lime-500 border-gray-200 border-2 rounded-full p-2 text-white  shadow">
                <FiLink />
              </div>
            </a>
          </div>
        ) : null}

        {links.github?.length ? (
          <div className="flex items-center  hover:cursor-pointer ">
            <a href={`//${links.github}`}>
              <div className="bg-black border-gray-200 border-2 rounded-full p-2 text-white  shadow">
                <AiFillGithub />
              </div>
            </a>
          </div>
        ) : null}

        <CardButtons stateStatus={stateStatus} />
      </>
    );
  };

  const SeeMore: React.FC<{
    type: string;
    stateStatus: boolean;
    name: string;
    icon: ReactElement;
    color: string;
  }> = ({ type, name, color, stateStatus, icon }) => {
    return (
      <div
        className="flex items-center hover:cursor-pointer"
        onClick={() => {
          stateStatus ? dispatch({ type: `${type}` }) : null;
        }}
      >
        <div
          className={`${color} rounded-full p-2 border-gray-200 border-2 text-white  shadow`}
        >
          {icon}
        </div>
      </div>
    );
  };

  const CardImage: React.FC = () => {
    return (
      <Image
        src={imageSrc}
        height={1}
        width={1}
        alt="Card Image"
        layout="responsive"
      />
    );
  };

  const MappedTags: React.FC<{ array: string[]; stateStatus: boolean }> = ({
    array,
    stateStatus,
  }) => {
    const color = [
      '#8b5cf6',
      '#6366f1',
      '#14b8a6',
      '#fb923c',
      '#ef4444',
      '#404040',
      '#65a30d',
      '#2563eb',
      '#f59e0b',
      '#9f1239',
    ];

    const sliced = array.slice(0, 3);
    const slicedMap = sliced.map((t) => {
      const aColor = Math.floor(Math.random() * color.length);

      const style = {
        backgroundColor: color[aColor],
      };
      return (
        <span
          key={uuidv4()}
          style={style}
          className={`px-2  text-white rounded-full font-bold m-[2px]`}
        >
          {t}
        </span>
      );
    });
    const map = array.map((t) => {
      const aColor = Math.floor(Math.random() * color.length);

      const style = {
        backgroundColor: color[aColor],
      };
      return (
        <span
          key={uuidv4()}
          style={style}
          className={`px-2  text-white rounded-full font-bold m-[2px]`}
        >
          {t}
        </span>
      );
    });

    if (!array.length) {
      return <span className="font-bold">No Tags</span>;
    }

    if (!stateStatus || state.tab === 'MAIN') {
      const numOfTags = array.length;
      if (numOfTags > 3)
        return (
          <div className="flex flex-wrap flex-col">
            <div className="flex flex-wrap items-center justify-center my-2">
              {slicedMap}
              <span className="font-bold text-sm ml-2">
                +{numOfTags - 3} more...
              </span>
            </div>
          </div>
        );
    }
    return (
      <div className="flex flex-col flex-wrap">
        <div className="flex flex-wrap justify-center my-2">{map}</div>
      </div>
    );
  };

  const Content: React.FC<{ currState: string; stateStatus: boolean }> = ({
    currState,
    stateStatus,
  }) => {
    if (currState === 'MAIN' || !stateStatus) {
      return (
        <>
          <div className={`mx-auto block w-3/4 text-center   `}>
            <div className="flex justify-between items-center my-3"></div>

            <CardImage />
          </div>
          <div className="flex flex-col w-full">
            <div className="font-bold my-3 text-2xl truncate">
              {stateStatus ? (
                <>
                  <h4 className="text-black">Created By:</h4>
                  <Link href={`/profile/${creatorId}`}>
                    <a className="hover:underline">
                      <span className="truncate  text-lg">{creatorId}</span>
                    </a>
                  </Link>
                </>
              ) : (
                <>
                  <h4 className="text-black">Created By:</h4>

                  <span className="truncate text-lg">{creatorId}</span>
                </>
              )}
            </div>
            <MappedTags stateStatus={stateStatus} array={tags} />
          </div>
        </>
      );
    }

    if (currState === 'DESC') {
      return (
        <>
          <div
            className="flex items-center hover:cursor-pointer"
            onClick={() => dispatch({ type: 'MAIN' })}
          >
            <h4 className={` text-xl mr-2 font-Poppins text-gray-400`}>
              Description
            </h4>
            <AiOutlineMinus />
          </div>
          <p className="w-full font-Hind overflow-y-scroll h-[553px] ">
            {description}
          </p>
        </>
      );
    }

    if (currState === 'USES') {
      return (
        <>
          <div
            className="flex items-center hover:cursor-pointer"
            onClick={() => dispatch({ type: 'MAIN' })}
          >
            <h4 className={` text-xl mr-2 font-Poppins text-gray-400`}>Uses</h4>
            <AiOutlineMinus />
          </div>
          <p className="w-full font-Hind overflow-y-scroll h-[553px]">{uses}</p>
        </>
      );
    }

    if (currState === 'TAGS') {
      return (
        <>
          <div
            className="flex items-center hover:cursor-pointer"
            onClick={() => dispatch({ type: 'MAIN' })}
          >
            <h4 className={` text-xl mr-2 font-Poppins text-gray-400`}>Tags</h4>
            <AiOutlineMinus />
          </div>
          <div className="w-full overflow-y-scroll h-[553px]">
            <MappedTags stateStatus={stateStatus} array={tags} />
          </div>
        </>
      );
    }
    return (
      <div>
        <span className="text-red-400 bold text-2xl">Card State Error</span>
      </div>
    );
  };

  return (
    <div
      className={`p-2 relative rounded-3xl bg-gray-200 mx-auto w-full sm:w-96 flex flex-col shadow  sm:h-fit
      `}
    >
      <div className="flex w-full justify-between items-center">
        <div className="w-full truncate">
          <span className={`text-sm p-1 font-extrabold `}>
            {level.toLowerCase()} -{' '}
            {openSource ? 'open-source' : 'closed-source'} -{' '}
            {projectType.toLowerCase()}
          </span>
          <div className="flex justify-between items-center">
            <h3
              className={`text-3xl font-thin font-Poppins text-gray-600 truncate p-1 `}
            >
              {name}
            </h3>
            <LikeButton />
          </div>
        </div>
      </div>

      {state.tab !== 'MAIN' ? (
        <div className="absolute bottom-10 right-1 w-full">
          <div className="flex flex-row text-2xl  justify-around  w-full text-white">
            <OutSideLinks stateStatus={stateStatus} />
          </div>
        </div>
      ) : (
        <div className="absolute top-[75px] right-1">
          <div className="flex flex-col text-2xl justify-around h-[300px]  w-full text-white">
            <OutSideLinks stateStatus={stateStatus} />
          </div>
        </div>
      )}
      <Content stateStatus={stateStatus} currState={state.tab} />
    </div>
  );
};

export default Card;
