import Head from 'next/head';

const HeadTags: React.FC = () => {
  return (
    <Head>
      <link
        rel="icon"
        type="image/svg"
        sizes="32x32"
        href="/images/logos/mainlogo.svg"
      />
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="CodeCards, be prepared, share confidently."
      ></meta>

      <title>Code Cards | Share prepared</title>
    </Head>
  );
};

export default HeadTags;
