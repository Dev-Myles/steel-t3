import { GetServerSideProps, NextPage } from 'next';
import { LoadingGif } from '../../components/util/LoadingGif';
import { trpc } from '../../utils/trpc';

interface CardParams {
  pid: string;
}

export const Card: NextPage<{ cardId: CardParams }> = ({ cardId }) => {
  const { data, isLoading } = trpc.useQuery(['card.get-card', cardId.pid]);
  const totalLikes = data?.likedBy.length;
  const privateStatus = data?.private ? 'Private' : 'Public';
  const creatorName = data?.creatorId;
  const projectName = data?.name;
  if (isLoading) {
    return (
      <div className="grid place-content-center h-screen">
        <LoadingGif />
      </div>
    );
  }

  return (
    <div className="grid place-content-center h-screen">
      <div className="border-2 border-gray-600">
        <span>{projectName}</span>
        <br />
        <span>{creatorName}</span>
        <br />
        <span>{privateStatus}</span>
        <br />
        <span>{totalLikes}</span>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params;
  return {
    props: {
      cardId: id,
    },
  };
};

export default Card;
