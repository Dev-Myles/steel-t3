import Image from 'next/image';

const HomeCardDiagram: React.FC = () => {
  return (
    <div className="w-screen bg-gradient-to-br from-background via-[#011611] to-[#012c20] p-3  pb-36">
      <div className="w-full   lg:rounded-3xl  flex flex-col mx-auto">
        <span className="font-Poppins text-5xl lg:text-7xl text-center pt-4 text-main border-b-[1px] pb-2 border-slate-700">
          Card Parts
        </span>
        <div className="flex flex-col  justify-center items-center sm:flex-row">
          <ul className="list-decimal shadow mt-2 rounded-3xl px-10 text-xl sm:ml-10 pt-5 text-main lg:text-3xl   font-Hind">
            <li>Level</li>
            <li>Open Source Status</li>
            <li>Project Type</li>
            <li>Name</li>
            <li>Project Type Picture</li>
            <li>Creator Name</li>
            <li>Tags</li>
            <li>View Tags</li>
            <li>View Uses</li>
            <li>View Description</li>
            <li>Links: GitHub/Live site</li>
            <li>Likes</li>
          </ul>

          <div className=" w-full sm:w-1/2 lg:w-1/3 block">
            <Image
              alt="card diagram"
              src={'/images/home/carddiagramr.svg'}
              height={1}
              width={1}
              layout="responsive"
            />
          </div>
        </div>
        <div className="flex flex-col sm:mt-5 justify-center items-center sm:flex-row">
          <div className=" w-full sm:w-1/2 lg:w-1/3 block  ">
            <div className="lg:mb-10 mb-2 sm:mb-6 text-center">
              <span className="font-Poppins text-3xl lg:text-5xl text-center text-main">
                Uses View
              </span>
            </div>
            <Image
              alt="card diagram"
              src={'/images/home/cardusesview.svg'}
              height={1}
              width={1}
              layout="responsive"
            />
          </div>
          <div className=" w-full sm:w-1/2 lg:w-1/3 block mt-10 sm:mt-0 ">
            <div className="lg:mb-10 mb-2 sm:mb-6 text-center">
              <span className="font-Poppins text-3xl lg:text-5xl text-center  text-main">
                Description View
              </span>
            </div>
            <Image
              alt="card diagram"
              src={'/images/home/carddescriptionview.svg'}
              height={1}
              width={1}
              layout="responsive"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCardDiagram;
