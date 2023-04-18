import { Helmet } from 'react-helmet-async';
import { CreateWorkModalContainer } from 'src/components/organisms/admin/containerComponents/CreateWorkModalContainer';
import { WorkListContainer } from 'src/components/organisms/admin/containerComponents/WorkListContainer';
import { NavigationWithHeader } from '../../../templates/admin/NavigraitonWithHeader';

export const Works = () => {
  return (
    <NavigationWithHeader>
      <Helmet>
        <title>活動実績一覧 | MakeIT</title>
      </Helmet>

      <CreateWorkModalContainer />
      <WorkListContainer />
    </NavigationWithHeader>
  );
};
