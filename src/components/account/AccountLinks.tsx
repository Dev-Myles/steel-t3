import { v4 as uuidv4 } from 'uuid';
import { LinksSchema } from '../../schema/account-schema';
import EditButton from '../buttons/EditButton';
import { LoadingGif } from '../util/LoadingGif';

const AccountLinks: React.FC<{
  props: any | undefined;
  isLoading: boolean | undefined;
}> = ({ props, isLoading }) => {
  const links: LinksSchema = props?.links as LinksSchema;
  const userLinks = links ? Object.entries(links).slice(2) : [];

  userLinks.push([
    'testing',
    'https://next-auth.js.org/getting-started/client#signout',
  ]);

  function mapLinks() {
    return userLinks.map((e) => {
      const linkName = e[0].charAt(0).toUpperCase() + e[0].slice(1);
      return (
        <div key={uuidv4()} className="truncate">
          <span className="font-bold text-2xl text-cyan-600">{linkName}</span>
          <br />
          <span className="font-bold ">{e[1]}</span>
        </div>
      );
    });
  }

  if (isLoading) {
    return <LoadingGif />;
  }

  const Links: React.FC = () => {
    return (
      <div className="[&>*]:block [&>*]:m-3 [&>*]:text-start ">
        {mapLinks()}
      </div>
    );
  };

  return (
    <div className="max-w-sm h-fit p-8 bg-gray-50 shadow-lg rounded-lg">
      <EditButton />
      <span className="text-cyan-600 font-bold text-3xl">Your Links</span>
      <Links />
    </div>
  );
};

export default AccountLinks;
