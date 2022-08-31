import { CardLinks } from '@prisma/client';
import Image from 'next/image';
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
  cardId?: string;
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
        <div className={`${color} rounded-lg p-1 text-white text-3xl shadow`}>
          {icon}
        </div>

        <h4 className={` text-xl ml-2 font-Hind text-gray-700`}>{name}</h4>
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
          className={`px-2  shadow text-white rounded-full font-bold m-[2px]`}
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
          className={`px-2  shadow text-white rounded-full font-bold m-[2px]`}
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
            <div className="flex items-center">
              <SeeMore
                color="bg-blue-500"
                icon={<AiOutlineTag />}
                stateStatus={stateStatus}
                name="Tags"
                type={'TAGS'}
              />
              <span className="font-bold text-sm ml-2">
                +{numOfTags - 3} more...
              </span>
            </div>

            <div className="flex flex-wrap justify-center my-2">
              {slicedMap}
            </div>
          </div>
        );
    }
    return (
      <div className="flex flex-col flex-wrap">
        {state.tab === 'TAGS' ? null : (
          <div className="flex items-center">
            <SeeMore
              icon={<AiOutlineTag />}
              color="bg-blue-500"
              stateStatus={stateStatus}
              name="Tags"
              type={'TAGS'}
            />
          </div>
        )}

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
            <div className="h-[50px]">
              <div className="flex items-center">
                <SeeMore
                  color="bg-indigo-500"
                  icon={<HiOutlineMenuAlt2 />}
                  stateStatus={stateStatus}
                  type={'DESC'}
                  name="Description"
                />
              </div>
            </div>
            <div className="h-[50px]">
              <div className="flex items-center">
                <SeeMore
                  icon={<BiWrench />}
                  color="bg-amber-500"
                  stateStatus={stateStatus}
                  type={'USES'}
                  name="Uses"
                />
              </div>
            </div>
            <MappedTags stateStatus={stateStatus} array={tags} />
            <div className="font-bold flex justify-between">
              <span className="truncate">Creator: {creatorId}</span>
            </div>
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
      className={`p-2 relative rounded-3xl bg-neutral-50 mx-auto w-full sm:w-96 flex flex-col shadow  sm:h-fit
      `}
    >
      <div className="flex w-full justify-between items-center">
        <div className="w-full">
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
            <span className="text-red-400 font-bold h-fit flex items-center justify-center">
              {likes.length + 10} <AiFillHeart className="inline" />
            </span>
          </div>
        </div>
      </div>
      <div className="absolute top-[75px] right-0">
        <div className="flex flex-col text-lg justify-around text-white">
          {links.website.length ? (
            <a href={`${links.website}`}>
              <div className="bg-lime-500 mx-2 my-2 flex shadow justify-center items-center p-2 rounded-full">
                <FiLink />
              </div>
            </a>
          ) : null}

          {links.github.length ? (
            <a href={`${links.github}`}>
              <div className="bg-black flex justify-center items-center shadow p-2  mx-2 my-2 rounded-full">
                <AiFillGithub />
              </div>
            </a>
          ) : null}
        </div>
      </div>
      <Content stateStatus={stateStatus} currState={state.tab} />
    </div>
  );
};

export default Card;
