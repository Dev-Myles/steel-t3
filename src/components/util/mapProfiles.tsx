import { v4 as uuidv4 } from 'uuid';
import ISearchData from '../../types/searchData';
import ProfileCard from '../cards/ProfileCard';

export function mapProfilesLink(data: ISearchData, active: boolean) {
  return data.profiles?.profileData.map((profile) => {
    return (
      <ProfileCard
        key={uuidv4()}
        active={active}
        userName={profile.userName}
        imageSrc={profile.user.image}
        cards={profile.cards}
        links={profile.links}
      />
    );
  });
}
