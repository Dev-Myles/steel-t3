import Image from 'next/image';
import { AiFillHeart } from 'react-icons/ai';

export const Card: React.FC<{
  projectType: string;
  creatorId: string;
  privateStatus: boolean;
  name: string;
  likes: string[];
  level: string;
  openSource: boolean;
  description: string;
  uses: string;
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
}) => {
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
  ]);

  const imageMap = new Map([
    ['WEBSITE', '/images/card-pics/website.svg'],
    ['WEBAPP', '/images/card-pics/webapp.svg'],
    ['VIDEOGAME', '/images/card-pics/videogame.svg'],
    ['FRAMEWORK', '/images/card-pics/framework.svg'],
    ['APPLICATION', '/images/card-pics/appilcation.svg'],
    ['CRYPTO', '/images/card-pics/crypto.svg'],
    ['ALGORITHM', '/images/card-pics/algorithm.svg'],
    ['AI', '/images/card-pics/ai.svg'],
    ['PACKAGE', '/images/card-pics/package.svg'],
    ['LIBRARY', '/images/card-pics/library.svg'],
    ['OS', '/images/card-pics/os.svg'],
    ['BOT', '/images/card-pics/bot.svg'],
    ['LANGUAGE', '/images/card-pics/language.svg'],
  ]);

  const border = `${borderMap.get(projectType)}`;
  const text = `${textMap.get(projectType)}`;
  const imageSrc = `${imageMap.get(projectType)}`;

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

  return (
    <fieldset
      className={`p-2 rounded-lg shadow h-screen sm:h-fit bg-white  border-2 ${border}`}
    >
      <legend
        className={`text-xl p-1 font-bold border-2 bg-white rounded-lg ${border}`}
      >
        {level} - {projectType}
      </legend>
      <div className="flex justify-between border-gray-300 border-b-2">
        <h3 className={`text-3xl truncate ${text}`}>{name}</h3>
        <span className="font-bold h-fit">
          {!privateStatus ? 'public' : 'private'}
          <br />
          <span className="text-red-400 flex items-center justify-center">
            {likes.length} <AiFillHeart className="inline" />
          </span>
        </span>
      </div>
      <div className="mx-auto block w-3/4 sm:w-1/2 h-1/2 ">
        <CardImage />
      </div>
      <div className="flex justify-between">
        <span> {!openSource ? 'open-source' : 'closed-source'}</span>
      </div>
      <div className="flex flex-col">
        <h4 className={`${text}`}>Description</h4>

        <p className="">{description}</p>
        <h4 className={`${text}`}>Uses</h4>
        <span>{uses}</span>

        <span className="font-bold truncate">Creator: {creatorId}</span>
      </div>
    </fieldset>
  );
};

export default Card;
