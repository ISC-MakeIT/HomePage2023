import { css } from '@emotion/react';
import { WhiteRadiusButton } from '../../../atoms/Button/WhiteRadiusButton';
import { GithubButtonContent } from '../Content/Github';

export const GithubButton = () => {
  return (
    <a href='https://github.com/ISC-MakeIT' css={css`text-decoration: none;`}>
      <WhiteRadiusButton content={<GithubButtonContent />} />
    </a>
  );
};
