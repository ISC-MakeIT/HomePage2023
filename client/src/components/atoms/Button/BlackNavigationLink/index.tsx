import { css } from '@emotion/react';
import Link from 'next/link';

interface BlackNavigationLinkProps {
  to: string;
  name: string;
}

export const BlackNavigationLink = ({ to, name }: BlackNavigationLinkProps) => {
  return (
    <Link
      href={to}
      css={css`
        display: block;
        text-decoration: none;
        color: #333;
        font-size: 1.125rem;
        font-weight: 550;
        font-family: 'Hiragino Kaku Gothic Pro';
      `}
    >
      {name}
    </Link>
  );
};
