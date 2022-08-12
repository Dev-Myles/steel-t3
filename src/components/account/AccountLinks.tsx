import Image from 'next/image';
import loadingGif from '../../public/gifs/loading.svg';
import { trpc } from '../../utils/trpc';

const AccountLinks: React.FC<{ userId: string | undefined }> = ({ userId }) => {
  const id = userId || 'run';
  const { isLoading, data } = trpc.useQuery([
    'account.get-profile',
    { userId: id },
  ]);

  const links = data?.links;

  function getLinks() {
    if (links) {
      const {
        github,
        instagram,
        discord,
        facebook,
        portfolio,
        twitter,
        linkedin,
        youtube,
        company,
      } = links;
      return {
        instagram,
        discord,
        facebook,
        portfolio,
        twitter,
        linkedin,
        youtube,
        github,
        company,
      };
    }
  }

  if (isLoading) {
    return (
      <div className="h-fit p-8 bg-gray-50 shadow-lg rounded-lg">
        <Image
          src={loadingGif}
          alt="loading"
          height={50}
          width={50}
          layout="fixed"
        />
      </div>
    );
  }

  const Links: React.FC = () => {
    return (
      <div className="[&>*]:inline-block [&>*]:m-3 [&>*]:text-center ">
        <div className="">
          <span className="font-bold text-2xl text-cyan-600">GitHub</span>
          <br />
          <span>{getLinks()?.github}</span>
        </div>
        <div>
          <span className="font-bold text-2xl text-cyan-600">Discord</span>
          <br />
          <span>{getLinks()?.discord}</span>
        </div>
        <div>
          <span className="font-bold text-2xl text-cyan-600">Youtube</span>
          <br />
          <span>{getLinks()?.youtube}</span>
        </div>
        <div>
          <span className="font-bold text-2xl text-cyan-600">Twitter</span>
          <br />
          <span>{getLinks()?.twitter}</span>
        </div>
        <div>
          <span className="font-bold text-2xl text-cyan-600">LinkedIn</span>
          <br />
          <span>{getLinks()?.linkedin}</span>
        </div>
        <div>
          <span className="font-bold text-2xl text-cyan-600">FaceBook</span>
          <br />
          <span>{getLinks()?.facebook}</span>
        </div>
        <div>
          <span className="font-bold text-2xl text-cyan-600">Company</span>
          <br />
          <span>{getLinks()?.company}</span>
        </div>
        <div>
          <span className="font-bold text-2xl text-cyan-600">Portfolio</span>
          <br />
          <span>{getLinks()?.portfolio}</span>
        </div>
        <div>
          <span className="font-bold text-2xl text-cyan-600">Instagram</span>
          <br />
          <span>{getLinks()?.instagram}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="h-fit p-8 bg-gray-50 shadow-lg rounded-lg">
      <h2>Links</h2>
      <Links />
    </div>
  );
};

export default AccountLinks;
