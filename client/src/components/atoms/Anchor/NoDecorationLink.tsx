import { css } from '@emotion/react';
import { Link, LinkProps } from 'react-router-dom';

type NoDecorationLinkProps = LinkProps;

export const NoDecorationLink = (props: NoDecorationLinkProps) => {
  return (
    <Link
      css={css`
        text-decoration: none;
      `}
      {...props}
    />
  );
};