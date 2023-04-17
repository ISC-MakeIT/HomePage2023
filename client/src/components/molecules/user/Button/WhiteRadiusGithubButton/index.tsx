import { css } from '@emotion/react';
import { WhiteRadiusButton } from '../../../../atoms/Button/WhiteRadiusButton';
import Link from 'next/link';
import { WhiteGithubButtonContent } from '../Content/WhiteGithubButtonContent';

export const WhiteRadiusGithubButton = () => {
  return (
    <Link
      href='https://github.com/ISC-MakeIT'
      css={css`
        text-decoration: none;
      `}
    >
      <WhiteRadiusButton content={<WhiteGithubButtonContent />} />
    </Link>
  );
};
