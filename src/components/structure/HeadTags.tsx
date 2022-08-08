import Head from 'next/head';

const HeadTags: React.FC = () => {
  return (
    <Head>
      {/* <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/favicon.svg"
      /> */}
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="CodeCards, share your code with people who don't know!"
      ></meta>

      <title>CodeCards</title>
    </Head>
  );
};

export default HeadTags;
