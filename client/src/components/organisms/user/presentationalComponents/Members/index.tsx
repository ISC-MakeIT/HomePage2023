import { type Member } from '@api/user/members';
import { css } from '@emotion/react';
import { BlackLargeTitle } from 'src/components/atoms/Title/BlackLargeTitle';
import { Member as MemberComponent } from 'src/components/molecules/user/Member';
import { maxScreen } from 'src/modules/helpers/mediaQueries';

interface MembersProps {
  members: Member[];
}

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
        />
      ))}
    </>
  );

  return (
    <section
      id="members"
      css={css`
        padding: 5rem 0;
        width: 84%;
        margin: 0 auto;
        ${maxScreen('md')} {
          width: 90%;
        }
        ${maxScreen('sm')} {
          width: 95%;
        }
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
        <BlackLargeTitle>メンバー紹介</BlackLargeTitle>
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
