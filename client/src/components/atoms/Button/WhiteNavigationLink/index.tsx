import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

type WhiteNavigationLinkProps = {
  to: string;
  name: string;
};

export const WhiteNavigationLink = ({ to, name }: WhiteNavigationLinkProps) => {
  return (
    <Link
      to={to}
      css={css`
        display: block;
        text-decoration: none;
        color: #fff;
        font-size: 1.125rem;
        font-weight: 550;
        font-family: 'Hiragino Kaku Gothic Pro';
      `}
    >
      {name}
    </Link>
  );
};
