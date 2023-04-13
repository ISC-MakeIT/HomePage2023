import { css } from '@emotion/react';
import { GreyMediumText } from 'src/components/atoms/Text/GreyMediumText';
import { RedBoldText } from 'src/components/atoms/Text/RedBoldText';
import { WhiteBoldText } from 'src/components/atoms/Text/WhiteBoldText';

type NotificationProps = {
  title: string;
  createdAt: string;
};

export const Notification = ({ title, createdAt }: NotificationProps) => {
  return (
    <div
      css={css`
        background-color: white;
        height: 2.5rem;
        border-radius: 1.25rem;
        padding: 1rem 3rem;
        display: flex;
        align-items: center;
        margin-bottom: 1.5rem;
        column-gap: 2rem;
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
        <WhiteBoldText>お知らせ</WhiteBoldText>
      </div>

      <RedBoldText>{title}</RedBoldText>
    </div>
  );
};
