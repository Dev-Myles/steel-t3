import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import ISearchData from '../../types/searchData';
import ProfileCard from '../cards/ProfileCard';

export function mapProfilesLink(data: ISearchData, active: boolean) {
  return data.profiles?.profileData.map((profile) => {
    return (
      <Link key={uuidv4()} href={`/profile/${profile.userName}`}>
        <a>
          <ProfileCard
            active={active}
            userName={profile.userName}
            imageSrc={profile.user.image}
            cards={profile.cards}
            links={profile.links}
          />
        </a>
      </Link>
    );
  });
}
