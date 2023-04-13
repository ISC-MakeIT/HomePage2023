import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

type LinkProps = {
  elementId: string;
  name: string;
};

export const NavigationLink: React.FC<LinkProps> = ({ elementId, name }) => {
  return (
    <Link
      to={`#${elementId}`}
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
