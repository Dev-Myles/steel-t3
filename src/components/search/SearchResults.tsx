import ISearchData from '../../types/searchData';
import { LoadingGif } from '../util/LoadingGif';
import { mapCardsLink } from '../util/mapCards';
import { mapProfilesLink } from '../util/mapProfiles';

const SearchResults: React.FC<{
  results: ISearchData;
  isLoading: boolean;
}> = ({ results, isLoading }) => {
  if (isLoading) {
    return (
      <div className="h-[200px]">
        <LoadingGif />
      </div>
    );
  }

  const Content: React.FC = () => {
    if (results?.card?.message) {
      return (
        <div>
          <span className="text-red-400 font-bold text-2xl">
            {results.card.message}
          </span>
        </div>
      );
    }
    if (results?.tags?.message) {
      return (
        <div>
          <span className="text-red-400 font-bold text-2xl">
            {results.tags.message}
          </span>
        </div>
      );
    }
    if (results?.profiles?.message) {
      return (
        <div>
          <span className="text-red-400 font-bold text-2xl">
            {results.profiles.message}
          </span>
        </div>
      );
    }
    if (results?.card?.cardData.length) {
      return (
        <div className="flex justify-center">
          {mapCardsLink(results.card.cardData, false)}
        </div>
      );
    }
    if (results?.tags?.cardData.length) {
      return (
        <div className="flex flex-wrap justify-center">
          {mapCardsLink(results.tags.cardData, false)}
        </div>
      );
    }

    if (results.profiles?.profileData.length) {
      return (
        <div className="flex justify-center">
          {mapProfilesLink(results, false)}
        </div>
      );
    }

    return (
      <div>
        <h3>Enter a search term in the bar...</h3>
      </div>
    );
  };

  return (
    <div className="p-2">
      <h2 className="text-3xl text-center">Results:</h2>
      <div className="text-center p-2">
        <Content />
      </div>
    </div>
  );
};

export default SearchResults;
