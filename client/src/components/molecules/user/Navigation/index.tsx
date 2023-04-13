import { css } from '@emotion/react';
import { NavigationLink } from 'src/components/atoms/Button/NavigationLink';

export const Navigation = () => {
  const linkList: { [key: string]: string } = {
    about: 'Make ITについて',
    new: '新着情報',
    achivement: '実績',
    member: 'メンバー',
  };

  return (
    <nav
      css={css`
        display: flex;
        width: max-content;
      `}
    >
      {Object.keys(linkList).map((id) => (
        <NavigationLink hrefId={id} name={linkList[id]} />
      ))}
    </nav>
  );
};
