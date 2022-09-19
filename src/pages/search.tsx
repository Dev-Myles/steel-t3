import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { AiOutlineSend } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import SearchResults from '../components/search/SearchResults';
import { SearchSchema } from '../schema/search-schema';
import { trpc } from '../utils/trpc';

const SearchPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchSchema>();

  const {
    data: cardData,
    status: cardStatus,
    mutate: cardSearch,
  } = trpc.useMutation(['search.search-card']);
  const {
    data: tagData,
    status: tagStatus,
    mutate: tagSearch,
  } = trpc.useMutation(['search.search-tags']);
  const {
    data: profileData,
    status: profileStatus,
    mutate: profileSearch,
  } = trpc.useMutation(['search.search-profile']);

  const onSubmit = handleSubmit((data) => {
    console.log(data.filterTypes === 'cards');

    if (data.filterTypes === 'cards') {
      cardSearch(data);
    }
    if (data.filterTypes === 'profiles') {
      profileSearch(data);
    }
    if (data.filterTypes === 'tags') {
      tagSearch(data);
    }
  });

  console.log(cardData);

  return (
    <div className="min-h-screen">
      <div className="w-screen mt-3 sm:w-1/3 mx-auto">
        <form
          className=" bg-background p-5 pb-1 rounded-full border-[1px] border-panel"
          onSubmit={onSubmit}
        >
          <h1 className="text-3xl ml-3">
            Search - <span className="text-text text-sm">Cards/Profiles</span>
          </h1>
          <div className="h-fit">
            <label className="relative flex">
              <div className="absolute top-2 left-2">
                <BsSearch />
              </div>
              <input
                type="text"
                placeholder="search..."
                {...register('searchString', {
                  maxLength: {
                    value: 32,
                    message: 'Search term 2-32 characters',
                  },
                  minLength: {
                    value: 2,
                    message: 'Search term 2-32 characters',
                  },
                  pattern: {
                    value: /^[A-Za-z0-9 ]+$/i,
                    message: 'can only contain letters, numbers, spaces',
                  },
                })}
                className="p-1 border-zinc-800 border-[1px] text-text pl-10 rounded-full"
              />
              <button
                type="submit"
                className="bg-none border-none absolute right-1 text-xl top-2 text-indigo-600 "
              >
                <AiOutlineSend />
              </button>
            </label>
          </div>
          <div className="text-center h-4">
            <span className="text-red-500">
              {errors?.searchString?.message}
            </span>
          </div>
          <div className="flex w-fit justify-around mx-auto mt-1">
            <label>
              <input
                {...register('filterTypes')}
                className="ring-none m-1 bg-panel rounded-none border-main checked:bg-main outline-none"
                type="radio"
                name="filterType"
                checked={true}
                value="cards"
              />
              <span>Cards</span>
            </label>
            <label>
              <input
                {...register('filterTypes')}
                className="ring-none m-1 bg-panel rounded-none border-main checked:bg-main outline-none"
                name="filterType"
                type="radio"
                value="profiles"
              />
              <span>Profiles</span>
            </label>
            <label>
              <input
                {...register('filterTypes')}
                className="ring-none m-1 bg-panel rounded-none border-main checked:bg-main outline-none"
                type="radio"
                name="filterType"
                value="tags"
              />
              <span>Tags</span>
            </label>
          </div>
        </form>

        <div>
          <SearchResults
            results={{ card: cardData, profiles: profileData, tags: tagData }}
            isLoading={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
