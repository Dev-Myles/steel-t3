import type { NextPage } from 'next';
import BaseTemplate from '../components/templates/base/BaseTemplate';
import { mockBaseTemplateProps } from '../components/templates/base/BaseTemplate.mock';

const Home: NextPage = () => {
  return (
    <>
      <BaseTemplate {...mockBaseTemplateProps.base} />
    </>
  );
};

export default Home;
