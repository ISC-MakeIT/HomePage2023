import { Helmet } from 'react-helmet-async';
import { WorksContainer } from 'src/components/organisms/user/containerComponents/WorksContainer';
import { HeaderWithPage } from 'src/components/templates/user/HeaderWithPage';

export const Works = () => {
  return (
    <HeaderWithPage>
      <Helmet>
        <title>実績一覧 | MakeIT</title>
      </Helmet>
      <WorksContainer />
    </HeaderWithPage>
  );
};
