import { css } from '@emotion/react';
import { BlackNavigationLink } from 'src/components/atoms/Button/BlackNavigationLink';
import { USER_ROUTE_PATH_MAP } from 'src/routes/routePath';

export const BlackNavigation = () => {
  const navigationList: Array<{ to: string; title: string }> = [
    {
      to: `${USER_ROUTE_PATH_MAP.TOP}#about`,
      title: 'Make ITについて',
    },
    {
      to: `${USER_ROUTE_PATH_MAP.TOP}#notification`,
      title: '新着情報',
    },
    {
      to: `${USER_ROUTE_PATH_MAP.TOP}#work`,
      title: '実績',
    },
    {
      to: `${USER_ROUTE_PATH_MAP.TOP}#members`,
      title: 'メンバー',
    },
  ];

  return (
    <nav
      css={css`
        display: flex;
        width: max-content;
        column-gap: 1.5rem;
      `}
    >
      {navigationList.map((navigation, index) => (
        <BlackNavigationLink key={index} to={navigation.to} name={navigation.title} />
      ))}
    </nav>
  );
};
