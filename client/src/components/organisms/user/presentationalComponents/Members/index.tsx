import { Member } from '@api/user/members';
import { css } from '@emotion/react';
import { BlackBoldTitle } from 'src/components/atoms/Title/BlackBoldTitle';
import { Member as MemberComponent } from 'src/components/molecules/user/Member';

type MembersProps = {
  members: Member[];
};

export const Members = ({ members }: MembersProps) => {
  const MemberList = () => (
    <>
      {members.map((member) => (
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
      ))}
    </>
  );

  return (
    <section
      id='members'
      css={css`
        padding: 5rem 0;
        width: 84%;
        margin: 0 auto;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 6.25rem auto;
        `}
      >
        <BlackBoldTitle>メンバー紹介</BlackBoldTitle>
      </div>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          row-gap: 40px;
          justify-content: space-around;
        `}
      >
        <MemberList />
      </div>
    </section>
  );
};
