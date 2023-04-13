import { useEffect, useState } from 'react';
import { Members } from '../../presentationalComponents/Members';
import { Member, apiMembers } from '@api/user/members';

export const MembersContainer = () => {
  const [members, setMembers] = useState<Member[]>();

  useEffect(() => {
    const main = async () => {
      try {
        const response = await apiMembers();
        setMembers(response);
      } catch (e) {
        console.error(e);
      }
    };

    main();
  }, []);

  if (!members) {
    return <></>;
  }

  return <Members members={members} />;
};
