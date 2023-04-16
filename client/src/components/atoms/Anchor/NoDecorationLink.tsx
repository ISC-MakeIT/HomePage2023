import { css } from '@emotion/react';
import Link, { LinkProps } from 'next/link';

type NoDecorationLinkProps = { children?: React.ReactNode } & LinkProps;

export const NoDecorationLink = (props: NoDecorationLinkProps) => {
  const { children } = props;

  return (
    <Link {...props}>
      <a
        href={props.href.toString()}
        css={css`
          text-decoration: none;
        `}
      >
        {children}
      </a>
    </Link>
  );
};
