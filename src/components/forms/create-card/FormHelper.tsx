import Image from 'next/image';

const FormHelper: React.FC = () => {
  return (
    <div className=" rounded-xl  p-2 shadow lg:w-1/4 h-fit mt-8 sm:ml-4">
      <h3 className="text-center text-2xl">Tips & How to</h3>
      <p className="mt-2">
        <span className="block text-xl font-bold text-main">Name-</span>
        Straight forward: your project name! If it is already taken... Get
        creative.
      </p>
      <p className="mt-2">
        <span className="block text-xl font-bold text-main">Description-</span>
        Here is the meat of your card. Your card&apos;s description is where you
        should put all the points you want to cover if someone should happen to
        ask you about your project or what you do. Don&apos;t write an essay but
        think about how you would present your project to a 5th grader.
        Don&apos;t be super technical.
      </p>
      <p className="mt-2">
        <span className="block text-xl font-bold text-main">
          Private Status-
        </span>
        Select whether or not you want your card to be searchable on the site or
        viewable on your profile. People will be able to see the card through a
        direct link whether or not it public or private to make sharing it easy
        with others.
      </p>
      <p className="mt-2">
        <span className="block text-xl font-bold text-main">Level-</span>
        Is this a professional site with aims of providing a service, a passion
        project, or something to show off your skills?
      </p>
      <p className="mt-2">
        <span className="block text-xl font-bold text-main">
          Open or Closed Source-
        </span>
        Can anyone fork, view, or contribute to your project?
      </p>
      <p className="mt-2">
        <span className="block text-xl font-bold text-main">Project Type-</span>
        What kind of project is this, a game, site, bot, etc?
      </p>
      <p className="mt-2">
        <span className="block text-xl font-bold text-main">Uses-</span>
        What are the intended uses for this project? Why would the user want to
        use?
      </p>
      <p className="mt-2">
        <span className="block text-xl font-bold text-main">Link-</span>
        Add links to the project&apos;s main site and/or code repository.
      </p>
      <p className="mt-2">
        <span className="block text-xl font-bold text-main">Tags</span>
        Descriptive one word tags used to search/describe your project.
      </p>
      <div className="flex flex-col sm:flex-row lg:flex-col  items-center">
        <ul className="list-decimal mt-4 sm:ml-10  text-main  text-lg font-Hind">
          <span className="text-main text-3xl mt-4">Card Parts</span>
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

        <div className=" w-full lg:w-full md:w-1/2 mx-auto  block">
          <Image
            alt="card diagram"
            src={'/images/home/carddiagramr.svg'}
            height={1}
            width={1}
            layout="responsive"
          />
        </div>
      </div>
    </div>
  );
};

export default FormHelper;
