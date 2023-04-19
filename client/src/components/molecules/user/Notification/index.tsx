import { css } from '@emotion/react';
import { Flex } from 'src/components/atoms/Layout/Flex';
import { GreyMediumText } from 'src/components/atoms/Text/GreyMediumText';
import { RedMediumBoldText } from 'src/components/atoms/Text/RedMediumBoldText';
import { WhiteMediumBoldText } from 'src/components/atoms/Text/WhiteMediumBoldText';
import { maxScreen } from 'src/modules/helpers/mediaQueries';

interface NotificationProps {
  title: string;
  createdAt: string;
}

export const Notification = ({ title, createdAt }: NotificationProps) => {
  return (
    <div
      css={css`
        background-color: #fff;
        border-radius: 1.25rem;
        padding: 1rem 3rem;
        display: flex;
        align-items: center;
        margin-bottom: 1.5rem;
        column-gap: 2rem;

        ${maxScreen(440)} {
          display: block;
        }
      `}
    >
      <Flex
        spacing="2rem"
        style={css`
          align-items: center;
        `}
      >
        <GreyMediumText>{createdAt}</GreyMediumText>

        <div
          css={css`
            background-color: #fa5d36;
            height: 1.5rem;
            border-radius: 1.25rem;
            padding: 0.5rem 2rem;
            font-weight: 400;
            margin-right: 1rem;
            flex-grow: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <WhiteMediumBoldText>お知らせ</WhiteMediumBoldText>
        </div>
      </Flex>

      <RedMediumBoldText>{title}</RedMediumBoldText>
    </div>
  );
};
