import { css } from '@emotion/react';
import { BlackRadiusButton } from 'src/components/atoms/Button/BlackRadiusButton';
import { BlackGithubButtonContent } from '../Content/BlackGithubButtonContent';
import Link from 'next/link';

export const BlackGithubButton = () => {
  return (
    <Link
      href='https://github.com/ISC-MakeIT'
      css={css`
        text-decoration: none;
      `}
    >
      <BlackRadiusButton content={<BlackGithubButtonContent />} />
    </Link>
  );
};
