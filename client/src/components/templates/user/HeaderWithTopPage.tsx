import { HeaderContainer } from 'src/components/organisms/user/containerComponents/HeaderContainer';

interface HeaderWithPageProps {
  children: React.ReactNode;
}

export const HeaderWithTopPage = ({ children }: HeaderWithPageProps) => {
  return (
    <>
      <HeaderContainer />
      {children}
    </>
  );
};
