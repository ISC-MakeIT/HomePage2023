import { css } from '@emotion/react';
import { HeaderContainer } from 'src/components/organisms/user/containerComponents/HeaderContainer';

type HeaderWithPageProps = {
  children: React.ReactNode;
};

export const HeaderWithTopPage = ({ children }: HeaderWithPageProps) => {
  return (
    <main>
      <HeaderContainer />
      {children}
    </main>
  );
};
