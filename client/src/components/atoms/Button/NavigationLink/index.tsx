import { css } from '@emotion/react';

type LinkProps = {
  href_classname: string;
  name: string;
};

export const NavigationLink: React.FC<LinkProps> = ({ href_classname, name }) => {
  return (
    <a
      href={`#${ href_classname }`}
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
