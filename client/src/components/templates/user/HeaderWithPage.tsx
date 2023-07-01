import { css } from '@emotion/react';
import { HeaderContainer } from 'src/components/organisms/user/containerComponents/HeaderContainer';

interface HeaderWithPageProps {
  children: React.ReactNode;
}

export const HeaderWithPage = ({ children }: HeaderWithPageProps) => {
  return (
    <div
      css={css`
        margin-top: 6rem;
      `}
    >
      <HeaderContainer />
      {children}
    </div>
  );
};
