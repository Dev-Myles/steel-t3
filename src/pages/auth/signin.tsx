import type { GetServerSideProps, NextPage } from 'next';
import { getProviders } from 'next-auth/react';
import SignInForm from '../../components/forms/signin/SignInForm';

const SignIn: NextPage<{ providers: object; session: object }> = ({
  providers,
}) => {
  return <SignInForm providers={providers} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

export default SignIn;
