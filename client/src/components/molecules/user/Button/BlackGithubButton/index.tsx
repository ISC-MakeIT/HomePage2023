import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { BlackRadiusButton } from 'src/components/atoms/Button/BlackRadiusButton';
import { BlackGithubButtonContent } from '../Content/BlackGithubButtonContent';

export const BlackGithubButton = () => {
  return (
    <Link
      to="https://github.com/ISC-MakeIT"
      css={css`
        text-decoration: none;
      `}
    >
      <BlackRadiusButton content={<BlackGithubButtonContent />} />
    </Link>
  );
};
