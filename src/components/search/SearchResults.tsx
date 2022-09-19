import ISearchData from '../../types/searchData';
import { LoadingGif } from '../util/LoadingGif';
import { mapCardsLink } from '../util/mapCards';

const SearchResults: React.FC<{
  results: ISearchData;

  isLoading: boolean;
}> = ({ results, isLoading }) => {
  if (isLoading) {
    return <LoadingGif />;
  }

  const Content: React.FC = () => {
    if (results.card?.length) {
      mapCardsLink(results.card, false);
    }

    if (results.profiles?.length) {
      return <div>profiles</div>;
    }

    return (
      <div>
        <h3>Enter a search term in the bar...</h3>
      </div>
    );
  };

  return (
    <div>
      <h2>Results:</h2>
      <div>
        <Content />
      </div>
    </div>
  );
};

export default SearchResults;
