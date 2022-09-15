import { useForm } from 'react-hook-form';
import {
  AiFillGithub,
  AiOutlineFundProjectionScreen,
  AiOutlineLink,
  AiOutlineSelect,
} from 'react-icons/ai';
import { BiPyramid, BiWrench } from 'react-icons/bi';
import { BsPen } from 'react-icons/bs';
import { RiEyeCloseLine, RiGitRepositoryPrivateLine } from 'react-icons/ri';
import {
  CreateCardDataSchema,
  CreateCardSchema,
} from '../../../schema/create-card-schema';
import { useSessionCheck } from '../../../utils/session/checkSession';
import { trpc } from '../../../utils/trpc';

const CreateCardForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCardSchema>();
  const sess = useSessionCheck();

  const { data } = trpc.useQuery(['account.get-profile-id']);
  const { mutate, error } = trpc.useMutation(['card.create-card']);

  const onSubmit = handleSubmit((data) => {
    const {
      private: privateStatus,
      name,
      projectType,
      level,
      openSource,
      creatorId,
      description,
      uses,
      tags,
      links,
    } = data;

    const filterTags = tags.filter((tag) => tag.length > 0);

    const moddedData: CreateCardDataSchema = {
      creatorId,
      description,
      name,
      projectType,
      level,
      private: privateStatus === 'private' ? true : false,
      openSource: openSource === 'open' ? true : false,
      uses,
      tags: filterTags,
      links,
    };
    console.log('submitted');
    mutate(moddedData);
  });

  return (
    <div className="bg-panel my-8 flex justify-center items-center flex-col w-screen sm:w-1/2 p-3 sm:py-4 mx-auto rounded-2xl">
      {error ? (
        <span className="text-xl text-red-500">
          Error creating card on server
        </span>
      ) : null}
      <h1 className="text-2xl font-bold">Create Card:</h1>
      <form className="sm:w-2/3 w-full flex flex-col" onSubmit={onSubmit}>
        <input
          type="hidden"
          {...register('creatorId', { required: true })}
          value={data?.userName}
        />
        <label className="relative  my-2 ">
          <div className="absolute text-2xl top-9 right-2">
            <AiOutlineFundProjectionScreen />
          </div>
          <span className="font-bold text-lg">Name of Project</span>
          <input
            className=""
            type="text"
            {...register('name', { required: true, maxLength: 20 })}
          />
        </label>

        <label className="flex relative flex-col">
          <div className="absolute text-2xl top-9 right-2">
            <BsPen />
          </div>
          <span className="font-bold text-lg">Description</span>
          <textarea
            spellCheck={true}
            className=" p-3 pr-8 sm:pr-6 h-[250px] focus:border-main hover:border-main  overflow-y-scroll resize-none bg-panel"
            {...register('description', { required: true, maxLength: 3000 })}
          />
        </label>

        <div className="flex my-2 flex-wrap justify-between items-center ">
          <label className="relative my-2 ">
            <div className="absolute text-2xl top-8 right-8">
              <RiGitRepositoryPrivateLine />
            </div>
            <span>Private Status</span>
            <select
              className="bg-panel"
              {...register('private', { required: true })}
            >
              <option value="private">Private </option>
              <option value="public">Pubilc </option>
            </select>
          </label>

          <label className="relative my-2 ">
            <div className="absolute text-2xl top-8 right-8">
              <BiPyramid />
            </div>
            <span>Level</span>
            <select
              className="bg-panel"
              {...register('level', { required: true })}
            >
              <option value="PROFESSIONAL">Professional</option>
              <option value="PUBLIC">Hobby</option>
              <option value="PORTFOLIO">Portfolio</option>
            </select>
          </label>

          <label className="relative my-2 ">
            <div className="absolute text-2xl top-8 right-8">
              <RiEyeCloseLine />
            </div>
            <span>Open Source</span>
            <select
              className="bg-panel"
              {...register('openSource', { required: true })}
            >
              <option value="closed">Closed</option>
              <option value="open">Open</option>
            </select>
          </label>

          <label className="relative my-2 ">
            <div className="absolute text-2xl top-8 right-8">
              <AiOutlineSelect />
            </div>
            <span>Project Type</span>
            <select
              className="bg-panel"
              {...register('projectType', { required: true })}
            >
              <option value="WEBSITE">Website</option>
              <option value="WEBAPP">Web-App</option>
              <option value="VIDEOGAME">Video Game</option>
              <option value="FRAMEWORK">Framework</option>
              <option value="APPLICATION">Application</option>
              <option value="CRYPTO">Crypto</option>
              <option value="ALGORITHM">Algorithm</option>
              <option value="AI">A.I.</option>
              <option value="PACKAGE">Package</option>
              <option value="LIBRARY">Library</option>
              <option value="OS">Operating System</option>
              <option value="BOT">Bot</option>
              <option value="SCRIPT">Script</option>
              <option value="LANGUAGE">Language</option>
              <option value="OTHER">Other</option>
            </select>
          </label>
        </div>

        <label className="flex relative f flex-col">
          <div className="absolute text-2xl top-9 right-2">
            <BiWrench />
          </div>
          <span className="font-bold text-lg">Uses</span>
          <textarea
            className="p-3 pr-6 h-[200px] focus:border-main hover:border-main  overflow-y-scroll resize-none bg-panel"
            {...register('uses', { required: true, maxLength: 1000 })}
          />
        </label>

        <label className="relative my-2 ">
          <div className="absolute text-2xl top-8 right-2">
            <AiFillGithub />
          </div>
          <span>GitHub Repo Link</span>
          <input
            type="text"
            placeholder="www.github.com"
            {...register('links.github', { required: false, maxLength: 1000 })}
          />
        </label>

        <label className="relative my-2 ">
          <div className="absolute text-2xl top-8 right-2">
            <AiOutlineLink />
          </div>
          <span>Website Link</span>
          <input
            type="text"
            placeholder="www.mysite.com"
            {...register('links.website', { required: false, maxLength: 1000 })}
          />
        </label>

        <div>
          <h3>Tags</h3>
          <input
            className="w-[100px] m-2"
            {...register('tags.0', { maxLength: 20 })}
            type="text"
          />
          <input
            className="w-[100px] m-2"
            {...register('tags.1', { maxLength: 20 })}
            type="text"
          />
          <input
            className="w-[100px] m-2"
            {...register('tags.2', { maxLength: 20 })}
            type="text"
          />
          <input
            className="w-[100px] m-2"
            {...register('tags.3', { maxLength: 20 })}
            type="text"
          />
          <input
            className="w-[100px] m-2"
            {...register('tags.4', { maxLength: 20 })}
            type="text"
          />
          <input
            className="w-[100px] m-2"
            {...register('tags.5', { maxLength: 20 })}
            type="text"
          />
          <input
            className="w-[100px] m-2"
            {...register('tags.6', { maxLength: 20 })}
            type="text"
          />
          <input
            className="w-[100px] m-2"
            {...register('tags.7', { maxLength: 20 })}
            type="text"
          />
          <input
            className="w-[100px] m-2"
            {...register('tags.8', { maxLength: 20 })}
            type="text"
          />
          <input
            className="w-[100px] m-2"
            {...register('tags.9', { maxLength: 20 })}
            type="text"
          />
        </div>

        <input
          type="submit"
          value="Create Card!"
          className="rounded-lg w-fit mx-auto mt-3 font-bold text-xl text-indigo-300 hover:text-indigo-500 hover:border-indigo-800 ease-in-out duration-300 hover:cursor-pointer  p-3 border-2 border-second"
        />
      </form>
    </div>
  );
};

export default CreateCardForm;
