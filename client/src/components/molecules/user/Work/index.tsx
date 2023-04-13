import { Work as APIWork } from '@api/user/works';
import { css } from '@emotion/react';
import { Stack } from 'src/components/atoms/Layout/Stack';
import { GreyMediumText } from 'src/components/atoms/Text/GreyMediumText';
import { BlackBoldTitle } from 'src/components/atoms/Title/BlackBoldTitle';

type WorkProps = APIWork;

export const Work = ({ title, contents }: WorkProps) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        gap: 120px;
      `}
    >
      <Stack
        style={css`
          max-width: 700px;
          word-break: break-all;
          line-height: 1.5;
        `}
        spacing={'0.8rem'}
      >
        <BlackBoldTitle>{title}</BlackBoldTitle>
        <GreyMediumText>{contents}</GreyMediumText>
      </Stack>

      <div>
        <img
          css={css`
            margin-bottom: 40px;
          `}
          src='/money_is_everything.png'
          alt='活動実績画像'
        />
      </div>
    </div>
  );
};
