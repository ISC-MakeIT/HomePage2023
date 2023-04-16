import { css } from '@emotion/react';
import { WhiteGithubButtonContent } from '../Content/WhiteGithubButtonContent';
import { WhiteButton } from 'src/components/atoms/Button/WhiteButton';
import { Arrow } from 'src/components/atoms/Button/Icon/Arrow';
import Link from 'next/link';

export const WhiteGithubButtonWithArrow = () => {
  return (
    <Link
      href='https://github.com/ISC-MakeIT'
      css={css`
        text-decoration: none;
      `}
    >
      <WhiteButton>
        <WhiteGithubButtonContent />
        <Arrow color='#fff' />
      </WhiteButton>
    </Link>
  );
};
