import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import BaseTemplate from '../components/templates/base/BaseTemplate';
import { mockBaseTemplateProps } from '../components/templates/base/BaseTemplate.mock';

const Home: NextPage = () => {
  const { data: session } = useSession();
  return <BaseTemplate {...mockBaseTemplateProps.base} />;
};

export default Home;
