import { CreateWorkModalContainer } from '@components/organisms/admin/containerComponents/CreateWorkModalContainer';
import { WorkListContainer } from '@components/organisms/admin/containerComponents/WorkListContainer';
import { NavigationWithHeader } from '@components/templates/admin/NavigraitonWithHeader';
import Head from 'next/head';

const Works = () => {
  return (
    <NavigationWithHeader>
      <Head>
        <title>活動実績一覧 | MakeIT</title>
      </Head>

      <CreateWorkModalContainer />
      <WorkListContainer />
    </NavigationWithHeader>
  );
};

export default Works;
