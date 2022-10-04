import { useRouter } from 'next/router';

const AccountDelete: React.FC = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center flex-col border-t-[1px] pt-5 border-slate-900">
      <h2 className="text-3xl text-red-500 font-thin">Delete Account</h2>
      <button
        onClick={() => router.push('/account/deleteaccount')}
        className="border-2 border-red-500 hover:border-red-700 hover:text-red-700 mt-5 rounded-lg text-red-500 py-2 px-4"
      >
        Delete Account
      </button>
    </div>
  );
};

export default AccountDelete;
