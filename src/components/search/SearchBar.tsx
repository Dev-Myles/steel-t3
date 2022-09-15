import { AiOutlineSend } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';

const SearchBar: React.FC = () => {
  return (
    <div>
      <form className="flex" onSubmit={() => {}}>
        <label className="relative sm:w-72">
          <div className="absolute top-1 left-2">
            <BsSearch />
          </div>
          <input
            type="text"
            placeholder="search..."
            className="p-1 border-zinc-800 border-[1px] text-text pl-10 rounded-full"
          />
        </label>
        <label className="relative  text-indigo-600 ">
          <div className="absolute right-0 top-1">
            <AiOutlineSend />
          </div>
          <input
            type="submit"
            className="h-8 w-8 text-lg ml-2 px-1 hover:cursor-pointer z-10 relative"
            value=""
          />
        </label>
      </form>
    </div>
  );
};

export default SearchBar;
