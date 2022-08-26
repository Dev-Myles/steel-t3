import Image from 'next/image';

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
  const CardImage: React.FC<{ src: string }> = ({ src }) => {
    return (
      <Image src={src} alt="Card Image" height={1} width={1} layout="fixed" />
    );
  };

  return (
    <div className="p-2 m-2 rounded-lg shadow max-w-prose bg-white">
      <div className="flex justify-between border-gray-300 border-b-2">
        <h3 className="text-3xl truncate">{name}</h3>
        <span className="font-bold h-fit">
          {!privateStatus ? 'public' : 'private'}
        </span>
      </div>
      <div className="flex justify-between">
        <span>{projectType}</span>
        <span>{level}</span>
        <span>{!openSource ? 'open-source' : 'closed-source'}</span>
      </div>
      <div className="flex flex-col">
        <p className="">{description}</p>
        <span>{uses}</span>

        <span className="font-bold truncate">
          Created by: {creatorId} --- Total Likes: {likes.length}
        </span>
      </div>
    </div>
  );
};

export default Card;
