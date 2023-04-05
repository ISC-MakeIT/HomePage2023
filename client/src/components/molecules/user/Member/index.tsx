import { css } from '@emotion/react';
import { useState } from 'react';
import { DiscordLogo } from 'src/components/atoms/Logo/Discord';
import { GithubLogo } from 'src/components/atoms/Logo/Github';
import { TwitterLogo } from 'src/components/atoms/Logo/Twitter';

type MemberProps = {
  background_color: string;
  name: string;
  skill: string;
  icon: string;
  content: {
    discord: string;
    twitter: string;
    github: string;
    description: string;
  };
};

export const Member: React.FC<MemberProps> = ({ background_color, name, skill, icon, content }) => {
  const [sideToggle, setSideToggle] = useState(true);
  const reverse = () => {
    setSideToggle(!sideToggle);
  };
  const front = css`
    width: 362px;
    height: 362px;
    margin-bottom: 84px;
    background-color: #ffffff;
    transform-style: preserve-3d;
    transition: 0.5s;
    box-shadow: 0px 2px 5px #919191;
  `;
  const rear = css`
    background-color: ${background_color};
    display: block;
    width: 362px;
    height: 362px;
    margin-bottom: 84px;
    transform: rotateY(180deg);
    transform-style: preserve-3d;
    transition: 0.5s;
    box-shadow: 0px 2px 5px #919191;
  `;
  const member_content_side_account_line = css`
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  `;
  return (
    <article
      css={sideToggle ? front : rear}
      onClick={() => {
        reverse();
      }}
    >
      <div
        css={css`
          background-color: #ffffff;
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          z-index: 2;
        `}
        style={sideToggle ? { opacity: 1 } : { opacity: 0 }}
      >
        <h1
          css={css`
            width: fit-content;
            margin: 20px auto;
          `}
        >
          <img src={icon} width={326} height={235} />
        </h1>
        <h3
          css={css`
            width: fit-content;
            margin: 20px auto;
            font-size: 24px;
            font-weight: 700;
          `}
        >
          {name}
        </h3>
        <p
          css={css`
            width: fit-content;
            margin: 7px auto;
            color: #333333;
            font-size: 16px;
            font-weight: 700;
          `}
        >
          {skill}
        </p>
      </div>
      <div
        css={css`
          color: #ffffff;
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          transform: rotateY(180deg);
        `}
      >
        <div
          css={css`
            width: 326px;
            margin: 19px auto;
          `}
        >
          <div css={member_content_side_account_line}>
            <DiscordLogo />
            <p>{content.discord}</p>
          </div>
          <div css={member_content_side_account_line}>
            <TwitterLogo />
            <p>{content.twitter}</p>
          </div>
          <div css={member_content_side_account_line}>
            <GithubLogo />
            <p>{content.github}</p>
          </div>
        </div>
        <p
          css={css`
            width: 326px;
            margin: 0 18px 32px 18px;
            position: absolute;
            bottom: 0;
          `}
        >
          {content.description}
        </p>
      </div>
    </article>
  );
};
