import { type Work as APIWork } from '@api/user/works';
import { css } from '@emotion/react';
import { Stack } from 'src/components/atoms/Layout/Stack';
import { BlackMediumText } from 'src/components/atoms/Text/BlackMediumText';
import { BlackLargeTitle } from 'src/components/atoms/Title/BlackLargeTitle';
import { maxScreen } from 'src/modules/helpers/mediaQueries';

type WorkProps = APIWork;

export const Work = ({ title, contents, thumbnail }: WorkProps) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        gap: 7.5rem;

        ${maxScreen('sm')} {
          display: block;
        }
      `}
    >
      <div
        css={css`
          min-width: 31rem;
          height: 41.25rem;
          background-image: url(${thumbnail});
          background-size: cover;
          background-position: center;
          order: 1;

          ${maxScreen('lg')} {
            min-width: 15.5rem;
            height: 20.7rem;
          }

          ${maxScreen('sm')} {
            width: 12rem;
            height: 16rem;
          }
        `}
      />

      <Stack
        style={css`
          max-width: 43.75rem;
          word-break: break-all;
          line-height: 1.5;
          order: 0;

          ${maxScreen('sm')} {
            max-width: initial;
          }
        `}
        spacing={'0.8rem'}
      >
        <BlackLargeTitle>{title}</BlackLargeTitle>
        <BlackMediumText>{contents}</BlackMediumText>
      </Stack>
    </div>
  );
};
