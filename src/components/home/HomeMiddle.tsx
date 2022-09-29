import { MdCreate, MdFolder, MdShare } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

const HomeMiddle: React.FC = () => {
  const context = [
    [
      'Project',
      'Complete a project or find an existing you have created.',
      <MdFolder key={uuidv4()} />,
    ],
    [
      'Card',
      'Create an account and fill out the easy to use form to get your code card.',
      <MdCreate key={uuidv4()} />,
    ],
    [
      'Share',
      'Share the link with someone or bring up your card on your mobile device or PC.',
      <MdShare key={uuidv4()} />,
    ],
  ];

  const ContentBox: React.FC<{
    title: any;
    desc: any;
    icon: any;
  }> = ({ title, desc, icon }) => {
    return (
      <div className="border-[1px] border-second hover:scale-105 duration-300 ease-in-out p-3 mx-2  rounded-2xl my-5 w-[300px] shadow-[0px_0px_10px_rgba(0,0,300,1)]">
        <h3 className="text-text font-HindThin text-2xl border-b-2 border-second pb-2">
          {title}
        </h3>
        <p className="mt-2  font-HindThin">{desc}</p>
        <div className="flex justify-center text-6xl my-3">{icon}</div>
      </div>
    );
  };

  function mapContent() {
    return context.map((item) => {
      return (
        <ContentBox
          key={uuidv4()}
          title={item[0]}
          desc={item[1]}
          icon={item[2]}
        />
      );
    });
  }

  return (
    <div className="relative">
      <div className="bg-panel pb-24 z-10 relative h-full w-full  before:h-28 before:top-[-50px]  before:w-full before:skew-y-3 before:z-[-1] before:border-dashed before:bg-inherit before:border-t-[1px] before:border-white before:absolute">
        <div className="p-8 pb-16 flex items-center flex-col">
          <h1 className="text-4xl sm:text-7xl text-second font-Poppins">
            As easy as:
          </h1>
          <div className="flex flex-col sm:flex-row mt-5 sm:justify-center flex-wrap">
            {mapContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMiddle;
