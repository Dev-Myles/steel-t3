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
  const { register, handleSubmit } = useForm<LinksSchema>({
    resolver: zodResolver(linksSchema),
  });
  const { mutate } = trpc.useMutation(['account.edit-links']);

  const mapLinks = {
    GitHub: links?.github ? links?.github : 'none',
    Company: links?.company ? links?.company : 'none',
    Discord: links?.discord ? links?.discord : 'none',
    Facebook: links?.facebook ? links?.facebook : 'none',
    Instagram: links?.instagram ? links?.instagram : 'none',
    LinkedIn: links?.linkedin ? links?.linkedin : 'none',
    Portfolio: links?.portfolio ? links?.portfolio : 'none',
    Twitter: links?.twitter ? links?.twitter : 'none',
    Youtube: links?.youtube ? links?.youtube : 'none',
  };

  if (isLoading) {
    return (
      <div
        className="max-w-sm h-fit p-4 pr-2 
    "
      >
        <h2 className=" text-2xl text-second">Links</h2>
        <LoadingGif />
      </div>
    );
  }

  function userLinks() {
    return Object.entries(mapLinks).map((e) => {
      return (
        <div key={uuidv4()} className="truncate w-1/4 sm:w-1/6 m-3 text-start">
          <span className="text-text  text-2xl ">{e[0]}</span>
          <br />
          <span className="text-white ">{e[1]}</span>
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
      className=" w-full font-HindThin  justify-center py-4 items-center h-fit 
      border-b-[1px] border-slate-900  truncate"
    >
      <div className="flex items-center">
        <h3 className="text-second text-3xl mr-3 mb-0 text-center sm:text-start">
          Links
        </h3>
        <EditFieldButton editFn={editLinks} />
      </div>
      {isEdit ? (
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-around  flex-row  [&>label>span]:text-lg [&>label>span]:font-Hind [&>label]:m-2 [&>label>input]:text-white [&>label>input]:flex [&>label>input]:flex-col flex-wrap">
            <label>
              <span> GitHub </span>
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
              <span> Company</span>
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
              <span> Discord</span>
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
              <span>Facebook</span>
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
              <span> Instagram</span>
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
              <span> LinkedIn</span>
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
              <span>Portfolio</span>
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
              <span> Twitter </span>
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
              <span> Youtube</span>
              <input
                defaultValue={mapLinks.Youtube}
                type="text"
                {...register('youtube', {
                  required: false,
                  maxLength: 100,
                })}
              />
            </label>
          </div>
          <button
            className="p-2 mx-auto mt-2 bg-second text-neutral-200 font-Hind text-xl hover:bg-slate-700
          "
            type="submit"
          >
            Apply Changes
          </button>
        </form>
      ) : (
        <div className="flex-row flex-wrap  flex justify-start sm:justify-center">
          {userLinks()}
        </div>
      )}
    </div>
  );
};

export default AccountLinks;
