import { css } from '@emotion/react';
import Link, { type LinkProps } from 'next/link';

type NoDecorationLinkProps = {children: React.ReactNode} & LinkProps;

export const NoDecorationLink = (props: NoDecorationLinkProps) => {
  return (
    <Link
      css={css`
        text-decoration: none;
      `}
      {...props}
    >
      {props.children}
    </Link>
  );
};
