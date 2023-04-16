import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { WhiteGithubButtonContent } from '../Content/WhiteGithubButtonContent';
import { WhiteButton } from 'src/components/atoms/Button/WhiteButton';
import { Arrow } from 'src/components/atoms/Button/Icon/Arrow';

export const WhiteGithubButtonWithArrow = () => {
  return (
    <Link
      to='https://github.com/ISC-MakeIT'
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
