import { zodResolver } from '@hookform/resolvers/zod';
import { Links } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { linksSchema, LinksSchema } from '../../schema/profile-schema';
import { trpc } from '../../utils/trpc';
import { EditFieldButton } from '../buttons/EditButton';
import { LoadingGif } from '../util/LoadingGif';

export const AccountLinks: React.FC<{
  links: Links | null | undefined;
  isLoading: boolean | undefined;
  profileId: any | undefined;
}> = ({ links, isLoading, profileId }) => {
  const [isEdit, setEdit] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LinksSchema>({
    resolver: zodResolver(linksSchema),
  });
  const { mutate } = trpc.useMutation(['account.edit-links']);

  const mapLinks = {
    GitHub: links?.github,
    Company: links?.company,
    Discord: links?.discord,
    Facebook: links?.facebook,
    Instagram: links?.instagram,
    LinkedIn: links?.linkedin,
    Portfolio: links?.portfolio,
    Twitter: links?.twitter,
    Youtube: links?.youtube,
  };

  if (isLoading) {
    return (
      <div
        className="max-w-sm h-fit p-4 pr-2 bg-white 
    rounded-lg shadow"
      >
        <h2 className=" text-2xl">Links</h2>
        <LoadingGif />
      </div>
    );
  }

  function userLinks() {
    return Object.entries(mapLinks).map((e) => {
      return (
        <div key={uuidv4()} className="truncate block m-4 text-start">
          <span className="font-bold text-2xl text-cyan-600">{e[0]}</span>
          <br />
          <span className="font-bold ">{e[1]}</span>
        </div>
      );
    });
  }

  function editLinks() {
    if (isEdit) setEdit(false);
    else setEdit(true);
  }

  function onSubmit(data: LinksSchema) {
    const dataWithId = {
      profileId,
      data: {
        ...data,
      },
    };
    window.location.reload();
    mutate(dataWithId);
  }

  return (
    <div
      className=" w-full sm:w-60 h-fit p-4 pr-2 bg-white 
      rounded-lg shadow truncate"
    >
      <h2 className=" text-2xl">
        Links <EditFieldButton editFn={editLinks} />
      </h2>
      {isEdit ? (
        <form
          className="flex flex-col justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label>
            GitHub
            <input
              type="text"
              defaultValue={mapLinks.GitHub}
              {...register('github', {
                required: false,
                maxLength: 100,
              })}
            />
          </label>
          <label>
            Company
            <input
              defaultValue={mapLinks.Company}
              type="text"
              {...register('company', {
                required: false,
                maxLength: 100,
              })}
            />
          </label>
          <label>
            Discord
            <input
              type="text"
              defaultValue={mapLinks.Discord}
              {...register('discord', {
                required: false,
                maxLength: 100,
              })}
            />
          </label>
          <label>
            Facebook
            <input
              defaultValue={mapLinks.Facebook}
              type="text"
              {...register('facebook', {
                required: false,
                maxLength: 100,
              })}
            />
          </label>
          <label>
            Instagram
            <input
              defaultValue={mapLinks.Instagram}
              type="text"
              {...register('instagram', {
                required: false,
                maxLength: 100,
              })}
            />
          </label>
          <label>
            LinkedIn
            <input
              defaultValue={mapLinks.LinkedIn}
              type="text"
              {...register('linkedin', {
                required: false,
                maxLength: 100,
              })}
            />
          </label>
          <label>
            Portfolio
            <input
              defaultValue={mapLinks.Portfolio}
              type="text"
              {...register('portfolio', {
                required: false,
                maxLength: 100,
              })}
            />
          </label>
          <label>
            Twitter
            <input
              defaultValue={mapLinks.Twitter}
              type="text"
              {...register('twitter', {
                required: false,
                maxLength: 100,
              })}
            />
          </label>
          <label>
            Youtube
            <input
              defaultValue={mapLinks.Youtube}
              type="text"
              {...register('youtube', {
                required: false,
                maxLength: 100,
              })}
            />
          </label>
          <button
            className="bg-gray-600 p-2 w-fit mx-auto mt-2
          "
            type="submit"
          >
            Apply Changes
          </button>
        </form>
      ) : (
        userLinks()
      )}
    </div>
  );
};

export default AccountLinks;
