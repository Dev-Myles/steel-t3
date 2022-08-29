import Image from 'next/image';
import { useReducer } from 'react';
import { AiFillGithub, AiFillHeart, AiOutlineClose } from 'react-icons/ai';
import { FiLink } from 'react-icons/fi';

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
}> = ({
  projectType,
  creatorId,
  privateStatus,
  name,
  likes,
  level,
  openSource,
  description,
  uses,
  stateStatus,
}) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  const SeeMore: React.FC<{ type: string; stateStatus: boolean }> = ({
    type,
    stateStatus,
  }) => {
    return (
      <div
        onClick={() => {
          stateStatus ? dispatch({ type: `${type}` }) : null;
        }}
      >
        <span className={`${text} cursor-pointer hover:underline`}>
          read more
        </span>
      </div>
    );
  };

  const borderMap = new Map([
    ['WEBSITE', 'border-green-500'],
    ['WEBAPP', 'border-blue-400'],
    ['VIDEOGAME', 'border-zinc-400'],
    ['FRAMEWORK', 'border-red-400'],
    ['APPLICATION', 'border-indigo-400'],
    ['CRYPTO', 'border-purple-700'],
    ['ALGORITHM', 'border-yellow-400'],
    ['AI', 'border-blue-700'],
    ['PACKAGE', 'border-brown-400'],
    ['LIBRARY', 'border-slate-400'],
    ['OS', 'border-gray-300'],
    ['BOT', 'border-blue-500'],
    ['LANGUAGE', 'border-orange-700'],
    ['OTHER', 'border-black'],
    ['SCRIPT', 'border-white'],
  ]);

  const textMap = new Map([
    ['WEBSITE', 'text-green-500'],
    ['WEBAPP', 'text-blue-400'],
    ['VIDEOGAME', 'text-zinc-400'],
    ['FRAMEWORK', 'text-red-400'],
    ['APPLICATION', 'text-indigo-400'],
    ['CRYPTO', 'text-purple-700'],
    ['ALGORITHM', 'text-yellow-400'],
    ['AI', 'text-blue-700'],
    ['PACKAGE', 'text-brown-400'],
    ['LIBRARY', 'text-slate-400'],
    ['OS', 'text-gray-300'],
    ['BOT', 'text-blue-500'],
    ['LANGUAGE', 'text-orange-700'],
    ['OTHER', 'text-black'],
    ['SCRIPT', 'text-black'],
  ]);

  const bgMap = new Map([
    ['WEBSITE', 'bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200'],
    ['WEBAPP', 'bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 '],
    [
      'VIDEOGAME',
      'bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 ',
    ],
    [
      'FRAMEWORK',
      'bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 ',
    ],
    [
      'APPLICATION',
      'bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 ',
    ],
    ['CRYPTO', 'bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 '],
    [
      'ALGORITHM',
      'bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 ',
    ],
    ['AI', 'bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 '],
    ['PACKAGE', 'bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 '],
    ['LIBRARY', 'bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 '],
    ['OS', 'bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 '],
    ['BOT', 'bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 '],
    [
      'LANGUAGE',
      'bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 ',
    ],
    ['OTHER', 'bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 '],
    ['SCRIPT', 'bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 '],
  ]);

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

  const border = `${borderMap.get(projectType)}`;
  const text = `${textMap.get(projectType)}`;
  const imageSrc = `${imageMap.get(projectType)}`;
  const background = `${bgMap.get(projectType)}`;

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

  const Content: React.FC<{ currState: string; stateStatus: boolean }> = ({
    currState,
    stateStatus,
  }) => {
    if (currState === 'MAIN' || !stateStatus) {
      return (
        <>
          <div className={`mx-auto block w-3/4 text-center  ${text} `}>
            <div className="flex justify-between items-center my-3">
              <span className="font-bold">
                {' '}
                {openSource ? 'Open-Source' : 'Close-Source'}{' '}
              </span>
              <div className="flex justify-around text-white">
                <a href="">
                  <div className="bg-gray-400 mx-3 flex shadow justify-center items-center w-6 h-6 rounded-lg">
                    <FiLink />
                  </div>
                </a>
                <a href="">
                  <div className="bg-gray-400 flex justify-center items-center shadow mx-3 h-6 w-6 rounded-lg">
                    <AiFillGithub />
                  </div>
                </a>
              </div>
            </div>

            <CardImage />
          </div>
          <div className="flex flex-col w-full">
            <div>
              <h4 className={`${text} text-xl`}>Description</h4>
              <p className=" w-80 line-clamp-3">{description}</p>
              <SeeMore stateStatus={stateStatus} type={'DESC'} />
            </div>
            <div>
              <h4 className={`${text} text-xl`}>Uses</h4>
              <p className="line-clamp-3 w-80">
                {uses.concat(
                  'fdsfsaff fdsdf fsdf sfsdfs fsdfsdf ffsdfsdf  fsdfsdfsdfsdf sdfs sdfsd fsdf fsdf ss'
                )}
              </p>
              <SeeMore stateStatus={stateStatus} type={'USES'} />
            </div>

            <p className="truncate w-80 font-bold">
              <span className={`${text} text-lg`}>Tags: </span>
              wert wwert wert wert wert wert wert wert wert wert wert
            </p>
            <div className="font-bold flex justify-between">
              <span className="truncate">Creator: {creatorId}</span>
              <span> {!privateStatus ? 'public' : 'private'}</span>
            </div>
          </div>
        </>
      );
    }

    if (currState === 'DESC') {
      return (
        <>
          <div className="">
            <h4 className={`${text} text-xl`}>Description</h4>
            <div onClick={() => dispatch({ type: 'MAIN' })}>
              <AiOutlineClose />
            </div>
          </div>
          <p className="w-full overflow-y-scroll h-[553px] ">{description}</p>
        </>
      );
    }

    if (currState === 'USES') {
      return (
        <>
          <div>
            <h4 className={`${text} text-xl`}>Uses</h4>
            <div onClick={() => dispatch({ type: 'MAIN' })}>
              <AiOutlineClose />
            </div>
          </div>
          <p className="w-full overflow-y-scroll h-[553px]">{uses}</p>
        </>
      );
    }

    if (currState === 'TAGS') {
      return (
        <>
          <div>
            <h4 className={`${text} text-xl`}>Tags</h4>
            <div onClick={() => dispatch({ type: 'MAIN' })}>
              <AiOutlineClose />
            </div>
          </div>
          <p className="w-full overflow-y-scroll h-[553px]">
            werwer, rewer, werwerw, wer, wer, fsfs
          </p>
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
    <fieldset
      className={`p-2 rounded-lg mx-auto w-full sm:w-96 flex flex-col shadow  sm:h-fit
       ${background} border-2 ${border}`}
    >
      <legend
        className={`text-xl p-1 font-bold border-2 bg-white rounded-lg ${border}`}
      >
        {level} - {projectType}
      </legend>
      <div className="flex w-full justify-between border-gray-300 border-b-2">
        <h3 className={`text-3xl truncate ${text}`}>{name}</h3>

        <span className="text-red-400 font-bold h-fit flex items-center justify-center">
          {likes.length} <AiFillHeart className="inline" />
        </span>
      </div>

      <Content stateStatus={stateStatus} currState={state.tab} />
    </fieldset>
  );
};

export default Card;
