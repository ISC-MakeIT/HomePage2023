import { css } from '@emotion/react';
import { IntroduceDiscordAccount } from '../../../atoms/Account/IntroduceDiscordAccount';
import { IntroduceTwitterAccount } from '../../../atoms/Account/IntroduceTwitterAccount';
import { IntroduceGithubAccount } from '../../../atoms/Account/IntroduceGithubAccount';
import { GreyMediumBoldText } from 'src/components/atoms/Text/GreyMediumBoldText';
import { BlackSmallTitle } from 'src/components/atoms/Title/BlackSmallTitle';
import { BackGroundImage } from 'src/components/atoms/Image/BackGroundImage';
import { Stack } from 'src/components/atoms/Layout/Stack';
import { BlackMediumText } from 'src/components/atoms/Text/BlackMediumText';

type MemberProps = {
  name: string;
  skill: string;
  icon: string;
  content: {
    discord?: string;
    twitter?: string;
    github?: string;
    description?: string;
  };
};

export const Member = ({ name, skill, icon, content }: MemberProps) => {
  return (
    <div
      css={css`
        background-color: #ffffff;
        width: 22.6rem;
        transition: 0.5s;
        box-shadow: 0px 2px 5px #919191;
        line-height: 1.5;
        white-space: pre-wrap;
        word-break: break-all;
        text-align: center;
        margin: 1.5rem auto;
        padding: 1.5rem 0;
      `}
    >
      <Stack
        spacing={'1rem'}
        style={css`
          width: 90%;
          margin: 0 auto;
        `}
      >
        <div
          css={css`
            box-shadow: 0 4px 4px rgba(51, 51, 51, 0.25);
          `}
        >
          <BackGroundImage width='100%' height='235px' image={icon} />
        </div>
        <BlackSmallTitle>{name}</BlackSmallTitle>
        <GreyMediumBoldText>{skill}</GreyMediumBoldText>

        <Stack
          spacing='1.5rem'
          style={css`
            text-align: left;
          `}
        >
          <BlackMediumText>{content.description}</BlackMediumText>

          <div>
            <IntroduceDiscordAccount>{content.discord}</IntroduceDiscordAccount>
            <IntroduceTwitterAccount>{content.twitter}</IntroduceTwitterAccount>
            <IntroduceGithubAccount>{content.github}</IntroduceGithubAccount>
          </div>
        </Stack>
      </Stack>
    </div>
  );
};
