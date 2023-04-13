import { css } from '@emotion/react';

type LinkProps = {
  hrefId: string;
  name: string;
};

export const NavigationLink: React.FC<LinkProps> = ({ hrefId, name }) => {
  return (
    <a
      href={`#${hrefId}`}
      css={css`
        display: block;
        text-decoration: none;
        width: max-content;
        margin-right: 24px;
        color: #ffffff;
        font-size: 18px;
        font-weight: 550;
        font-family: 'Hiragino Kaku Gothic Pro';
      `}
    >
      {name}
    </a>
  );
};
