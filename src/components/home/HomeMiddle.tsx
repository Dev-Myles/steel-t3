import { v4 as uuidv4 } from 'uuid';

const HomeMiddle: React.FC = () => {
  const context = [
    ['Project', 'e'],
    ['Card', 'e'],
    ['Share', 'e'],
  ];

  const ContentBox: React.FC<{
    title: string | undefined;
    desc: string | undefined;
  }> = ({ title, desc }) => {
    return (
      <div className="">
        <h3 className="">{title}</h3>
        <p className="">{desc}</p>
      </div>
    );
  };

  function mapContent() {
    return context.map((item) => {
      return <ContentBox key={uuidv4()} title={item[0]} desc={item[1]} />;
    });
  }

  return (
    <div className="relative">
      <div className="bg-panel z-10 relative h-full w-full  before:h-28 before:top-[-50px]  before:w-full before:skew-y-3 before:z-[-1] before:border-dashed before:bg-inherit before:border-t-[1px] before:border-white before:absolute">
        <div className="p-8 flex justify-center ">
          <h1 className="sm:text-7xl text-second font-Poppins">As easy as:</h1>
          <div>{mapContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default HomeMiddle;
