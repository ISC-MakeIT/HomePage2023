import { CreateWorkModalContainer } from 'src/components/organisms/admin/containerComponents/CreateWorkModalContainer';
import { WorkListContainer } from 'src/components/organisms/admin/containerComponents/WorkListContainer';
import { NavigationWithHeader } from 'src/components/templates/admin/NavigraitonWithHeader';

const Works = () => {
  return (
    <NavigationWithHeader>
      <CreateWorkModalContainer />
      <WorkListContainer />
    </NavigationWithHeader>
  );
};

export default Works;
