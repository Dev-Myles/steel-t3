import { NextPage } from 'next';
import { signOut } from 'next-auth/react';
import { trpc } from '../../utils/trpc';

const DeleteAccountPage: NextPage = () => {
  const { mutate, error } = trpc.useMutation('account.delete-account');

  return (
    <div className="min-h-screen flex flex-col items-center">
      {error && (
        <h2 className="text-red-500">
          Error deleting your account. Try again later.
        </h2>
      )}
      <h1 className="text-red-500 text-2xl mt-10">
        Are you sure you want to delete your account? This cannot be undone.
      </h1>
      <button
        onClick={() => {
          mutate();
          signOut({ redirect: true, callbackUrl: '/accountdeleted' });
        }}
        className="border-red-500 border-2 w-fit rounded-lg text-red-500 py-2 px-4 mt-5 hover:text-red-700 hover:border-red-700"
      >
        Delete Account
      </button>
    </div>
  );
};

export default DeleteAccountPage;
