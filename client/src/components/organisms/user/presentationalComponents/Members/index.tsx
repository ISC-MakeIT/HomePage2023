import { Member } from '@api/user/members';
import { css } from '@emotion/react';
import { Member as MemberComponent } from 'src/components/molecules/user/Member';

type MembersProps = {
  members: Member[];
};

export const Members = ({ members }: MembersProps) => {
  const memberList = members.map((member) => {
    return (
      <MemberComponent
        key={member.memberId}
        name={member.name}
        skill={member.jobTitle}
        icon={member.thumbnail}
        content={{
          discord: member.discord,
          twitter: member.twitter,
          github: member.github,
          description: member.description,
        }}
        backgroundColor='#F15B88'
      />
    );
  });

  return (
    <div
      css={css`
        padding: 80px 0;
        width: 84%;
        margin: 0 auto;
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
          display: flex;
          flex-wrap: wrap;
          row-gap: 40px;
          justify-content: space-around;
        `}
      >
        {memberList}
      </div>
    </div>
  );
};
