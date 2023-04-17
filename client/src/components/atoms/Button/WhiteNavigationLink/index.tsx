import { css } from '@emotion/react';
import Link from 'next/link';

type WhiteNavigationLinkProps = {
  to: string;
  name: string;
};

export const WhiteNavigationLink = ({ to, name }: WhiteNavigationLinkProps) => {
  return (
    <Link href={to}>
      <a
        href={to}
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
      </a>
    </Link>
  );
};
