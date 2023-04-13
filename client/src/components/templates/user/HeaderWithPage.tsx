import { css } from '@emotion/react';
import { HeaderContainer } from 'src/components/organisms/user/containerComponents/HeaderContainer';

type HeaderWithPageProps = {
  children: React.ReactNode;
};

export const HeaderWithPage = ({ children }: HeaderWithPageProps) => {
  return (
    <main
      css={css`
        margin-top: 6rem;
      `}
    >
      <HeaderContainer />
      {children}
    </main>
  );
};
