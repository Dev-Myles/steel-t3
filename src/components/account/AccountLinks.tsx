import { Links } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import EditButton from '../buttons/EditButton';
import { LoadingGif } from '../util/LoadingGif';

export const AccountLinks: React.FC<{
  links: Links | null | undefined;
  isLoading: boolean | undefined;
}> = ({ links, isLoading }) => {
  const mapLinks = {
    GitHub: links?.github,
    Company: links?.company,
    Discord: links?.discord,
    Facebook: links?.facebook,
    Instagram: links?.instagram,
    LinkedIn: links?.linkedin,
    Portfolio: links?.portfolio,
    Twitter: links?.twitter,
    Youtube: links?.youtube,
  };

  if (isLoading) {
    return <LoadingGif />;
  }

  function userLinks() {
    return Object.entries(mapLinks).map((e) => {
      return (
        <div key={uuidv4()} className="truncate block m-4 text-start">
          <span className="font-bold text-2xl text-cyan-600">{e[0]}</span>
          <br />
          <span className="font-bold ">{e[1]}</span>
        </div>
      );
    });
  }

  return (
    <div
      className="max-w-sm h-fit p-4 pr-2 bg-white 
      rounded-lg shadow"
    >
      <EditButton />
      <h2 className=" text-2xl">Links</h2>
      <div>{userLinks()}</div>
    </div>
  );
};

export default AccountLinks;
