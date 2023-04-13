import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { IntroduceDiscordAccount } from '../../../atoms/Account/IntroduceDiscordAccount';
import { IntroduceTwitterAccount } from '../../../atoms/Account/IntroduceTwitterAccount';
import { IntroduceGithubAccount } from '../../../atoms/Account/IntroduceGithubAccount';
import { GreyBoldText } from 'src/components/atoms/Text/GreyBoldText';
import { BlackSmallTitle } from 'src/components/atoms/Title/BlackSmallTitle';
import { WhiteMediumText } from 'src/components/atoms/Text/WhiteMediumText';
import { BackGroundImage } from 'src/components/atoms/Image/BackGroundImage';
import { Stack } from 'src/components/atoms/Layout/Stack';

type MemberProps = {
  backgroundColor: string;
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

export const Member = ({ backgroundColor, name, skill, icon, content }: MemberProps) => {
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [height, setHeight] = useState<number>();

  const frontMemberElement = useRef<HTMLDivElement>(null);
  const rearMemberElement = useRef<HTMLDivElement>(null);

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const memberCardHeight = (): string | undefined => {
    if (height) {
      return `height: ${height}px;`;
    }

    return undefined;
  };

  const front = css`
    background-color: #ffffff;
  `;
  const rear = css`
    background-color: ${backgroundColor};
    transform: rotateY(180deg);
  `;

  useEffect(() => {
    if (frontMemberElement.current && rearMemberElement.current) {
      if (frontMemberElement.current.clientHeight < 402 && rearMemberElement.current.clientHeight < 402) {
        return;
      }

      if (frontMemberElement.current.clientHeight > rearMemberElement.current.clientHeight) {
        setHeight(frontMemberElement.current.clientHeight);
        return;
      }

      setHeight(rearMemberElement.current.clientHeight);
      return;
    }
  }, [frontMemberElement, rearMemberElement]);

  return (
    <div
      css={css`
        width: 22.6rem;
        transition: 0.5s;
        box-shadow: 0px 2px 5px #919191;
        transform-style: preserve-3d;
        line-height: 1.5;
        white-space: pre-wrap;
        &:hover {
          cursor: pointer;
        }

        ${isReversed ? rear : front}
      `}
      onClick={reverse}
    >
      <div
        css={css`
          background-color: #ffffff;
          width: 90%;
          backface-visibility: hidden;
          z-index: 2;
          margin: 1.5rem auto;
          word-break: break-all;

          ${memberCardHeight()}
          ${isReversed ? { opacity: 0 } : { opacity: 1 }}
        `}
        ref={frontMemberElement}
      >
        <BackGroundImage width='100%' height='235px' image={icon} />
        <BlackSmallTitle>{name}</BlackSmallTitle>
        <GreyBoldText>{skill}</GreyBoldText>
      </div>

      <div
        css={css`
          color: #ffffff;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          margin: 1.5rem auto;
          word-break: break-all;
          backface-visibility: hidden;
          transform: rotateY(180deg);

          ${memberCardHeight()}
        `}
        ref={rearMemberElement}
      >
        <Stack
          spacing='1.5rem'
          style={css`
            width: 90%;
            margin: auto;
          `}
        >
          <div>
            <IntroduceDiscordAccount>{content.discord}</IntroduceDiscordAccount>
            <IntroduceTwitterAccount>{content.twitter}</IntroduceTwitterAccount>
            <IntroduceGithubAccount>{content.github}</IntroduceGithubAccount>
          </div>

          <WhiteMediumText>{content.description}</WhiteMediumText>
        </Stack>
      </div>
    </div>
  );
};
