import { useRouter } from 'next/router';
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

const CreateCardForm: React.FC<{ userName: string }> = ({ userName }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCardSchema>();
  useSessionCheck(true);
  const router = useRouter();

  const { mutate, error } = trpc.useMutation(['card.create-card'], {
    onSuccess: (data) => {
      router.push(`/card/${data}`);
    },
  });

  const onSubmit = handleSubmit((data) => {
    const {
      private: privateStatus,
      name,
      projectType,
      level,
      openSource,
      description,
      uses,
      tags,
      links,
    } = data;

    const filterTags = tags.filter((tag) => tag.length > 0);

    const moddedData: CreateCardDataSchema = {
      creatorId: userName,
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
    mutate(moddedData);
  });

  return (
    <div className="bg-panel my-8 flex justify-center items-center flex-col w-screen sm:w-1/2 p-3 sm:p-1 sm:py-4 shadow rounded-2xl">
      {error ? (
        <span className="text-xl text-red-500">
          Error creating card on server
        </span>
      ) : null}
      <h1 className="text-2xl font-bold">Create Card:</h1>
      <form className="sm:w-2/3 w-full flex flex-col" onSubmit={onSubmit}>
        <label className="relative  my-2 ">
          <div className="absolute text-2xl top-9 right-2">
            <AiOutlineFundProjectionScreen />
          </div>
          <span className="font-bold text-lg">Name of Project</span>
          <input
            className=""
            type="text"
            {...register('name', {
              required: 'Name is required',
              pattern: {
                value: /^[A-Za-z0-9 ]+$/i,
                message: 'can only contain letters or numbers',
              },
              maxLength: {
                value: 25,
                message: 'Max of 25 characters',
              },
              minLength: {
                value: 2,
                message: 'Min of 2 characters',
              },
            })}
          />
          <div className="text-center h-4">
            <span className="text-red-500">{errors?.name?.message}</span>
          </div>
        </label>

        <label className="flex relative flex-col">
          <div className="absolute text-2xl top-9 right-2">
            <BsPen />
          </div>
          <span className="font-bold text-lg">Description</span>
          <textarea
            spellCheck={true}
            className=" p-3 pr-8 sm:pr-6 h-[250px] focus:border-main hover:border-main  overflow-y-scroll resize-none bg-panel"
            {...register('description', {
              required: 'Description is required',
              pattern: {
                value: /^[A-Za-z0-9 _.,!"'/$]+$/i,
                message: 'can only contain letters',
              },
              maxLength: {
                value: 2000,
                message: 'Max of 2000 characters',
              },
              minLength: {
                value: 2,
                message: 'Min of 2 characters',
              },
            })}
          />
          <div className="text-center h-4">
            <span className="text-red-500">{errors?.description?.message}</span>
          </div>
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
            {...register('uses', {
              required: 'Uses is required',
              pattern: {
                value: /^[A-Za-z0-9 _.,!"'/$]+$/i,
                message: 'Can only contain letters and numbers',
              },
              maxLength: {
                value: 1000,
                message: 'Max of 1000 characters',
              },
              minLength: {
                value: 2,
                message: 'Min of 2 characters',
              },
            })}
            spellCheck={true}
          />
          <div className="text-center h-4">
            <span className="text-red-500">{errors?.uses?.message}</span>
          </div>
        </label>

        <label className="relative my-2 ">
          <div className="absolute text-2xl top-8 right-2">
            <AiFillGithub />
          </div>
          <span>GitHub Repo Link</span>
          <input
            type="text"
            placeholder="www.github.com"
            {...register('links.github', {
              required: false,
              // pattern: {
              //   value:
              //     /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%. ~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_.~#?&=]*)$/,
              //   message: 'Must be a vaild url',
              // },
              maxLength: {
                value: 150,
                message: 'Max of 25 characters',
              },
              minLength: {
                value: 12,
                message: 'Min of 2 characters',
              },
            })}
          />
          <div className="text-center h-4">
            <span className="text-red-500">
              {errors?.links?.github?.message}
            </span>
          </div>
        </label>

        <label className="relative my-2 ">
          <div className="absolute text-2xl top-8 right-2">
            <AiOutlineLink />
          </div>
          <span>Website Link</span>
          <input
            type="text"
            placeholder="www.mysite.com"
            {...register('links.website', {
              required: false,
              // pattern: {
              //   value:
              //     /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%. ~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_.~#?&=]*)$/,

              //   message: 'Must be a vaild url',
              // },
              maxLength: {
                value: 150,
                message: 'Max of 150 characters',
              },
              minLength: {
                value: 12,
                message: 'Min of 12 characters',
              },
            })}
          />
          <div className="text-center h-4">
            <span className="text-red-500">
              {errors?.links?.website?.message}
            </span>
          </div>
        </label>

        <div>
          <h3>Tags- must be at least 2-15 characters long</h3>

          <input
            className="w-[100px] m-2"
            {...register('tags.0', {
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: 'Can only contain letters and numbers',
              },
              maxLength: {
                value: 15,
                message: 'Max of 15 characters',
              },
              minLength: {
                value: 2,
                message: 'Min of 2 characters',
              },
            })}
            type="text"
          />
          <input
            className="w-[100px] m-2"
            {...register('tags.1', {
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: 'Can only contain letters and numbers',
              },
              maxLength: {
                value: 15,
                message: 'Max of 15 characters',
              },
              minLength: {
                value: 2,
                message: 'Min of 2 characters',
              },
            })}
            type="text"
          />
          <input
            className="w-[100px] m-2"
            {...register('tags.2', {
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: 'Can only contain letters and numbers',
              },
              maxLength: {
                value: 15,
                message: 'Max of 15 characters',
              },
              minLength: {
                value: 2,
                message: 'Min of 2 characters',
              },
            })}
            type="text"
          />
          <input
            className="w-[100px] m-2"
            {...register('tags.3', {
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: 'Can only contain letters and numbers',
              },
              maxLength: {
                value: 15,
                message: 'Max of 15 characters',
              },
              minLength: {
                value: 2,
                message: 'Min of 2 characters',
              },
            })}
            type="text"
          />
          <input
            className="w-[100px] m-2"
            {...register('tags.4', {
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: 'Can only contain letters and numbers',
              },
              maxLength: {
                value: 15,
                message: 'Max of 15 characters',
              },
              minLength: {
                value: 2,
                message: 'Min of 2 characters',
              },
            })}
            type="text"
          />
          <input
            className="w-[100px] m-2"
            {...register('tags.5', {
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: 'Can only contain letters and numbers',
              },
              maxLength: {
                value: 15,
                message: 'Max of 15 characters',
              },
              minLength: {
                value: 2,
                message: 'Min of 2 characters',
              },
            })}
            type="text"
          />
          <input
            className="w-[100px] m-2"
            {...register('tags.6', {
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: 'Can only contain letters and numbers',
              },
              maxLength: {
                value: 15,
                message: 'Max of 15 characters',
              },
              minLength: {
                value: 2,
                message: 'Min of 2 characters',
              },
            })}
            type="text"
          />
          <input
            className="w-[100px] m-2"
            {...register('tags.7', {
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: 'Can only contain letters and numbers',
              },
              maxLength: {
                value: 15,
                message: 'Max of 15 characters',
              },
              minLength: {
                value: 2,
                message: 'Min of 2 characters',
              },
            })}
            type="text"
          />
          <input
            className="w-[100px] m-2"
            {...register('tags.8', {
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: 'Can only contain letters and numbers',
              },
              maxLength: {
                value: 15,
                message: 'Max of 15 characters',
              },
              minLength: {
                value: 2,
                message: 'Min of 2 characters',
              },
            })}
            type="text"
          />
          <input
            className="w-[100px] m-2"
            {...register('tags.9', {
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: 'Can only contain letters and numbers',
              },
              maxLength: {
                value: 15,
                message: 'Max of 15 characters',
              },
              minLength: {
                value: 2,
                message: 'Min of 2 characters',
              },
            })}
            type="text"
          />
        </div>

        <input
          type="submit"
          value="Create Card!"
          className="rounded-lg w-fit mx-auto mt-5 font-bold text-xl text-indigo-300 hover:text-indigo-500 hover:border-indigo-800 ease-in-out duration-300 hover:cursor-pointer  p-3 border-2 border-second"
        />
      </form>
    </div>
  );
};

export default CreateCardForm;
