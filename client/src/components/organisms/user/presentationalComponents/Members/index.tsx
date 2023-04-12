import { apiMembers } from '@api/user/members';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Member as MemberComponent } from 'src/components/molecules/user/Member';

interface Member {
  memberId: number;
  name: string;
  jobTitle: string;
  discord?: string;
  twitter?: string;
  github?: string;
  description: string;
}

export const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  useEffect(() => {
    (async () => {
      const data = await apiMembers();
      setMembers(data);
    })();
  }, []);
  const memberList = members.map((data, index) => {
    return (
      <MemberComponent
        key={index}
        name={data.name}
        skill={data.jobTitle}
        // icon={data.icon}
        icon='/images/index_top_background.jpg'
        content={{ discord: data.discord, twitter: data.twitter, github: data.github, description: data.description }}
        // background_color={data.backgroundColor}
        background_color='#F15B88'
      />
    );
  });
  return (
    <div
      css={css`
        padding-top: 80px;
      `}
    >
      <h1
        css={css`
          text-align: center;
          font-size: 32px;
          font-weight: 700;
          margin: 100px;
        `}
      >
        メンバー紹介
      </h1>
      <div
        css={css`
          width: 84%;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-items: flex-start;
        `}
      >
        {memberList}
      </div>
    </div>
  );
};
