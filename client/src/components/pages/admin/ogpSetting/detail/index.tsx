import { Helmet } from 'react-helmet-async';
import { NavigationWithHeader } from '../../../../templates/admin/NavigraitonWithHeader';
import { OGPDetailContainer } from 'src/components/organisms/admin/containerComponents/OGPDetailContainer';
import { useSearchParams } from 'react-router-dom';

export const OGPDetail = () => {
  const [searchParams] = useSearchParams();

  return (
    <NavigationWithHeader>
      <Helmet>
        <title>OGP設定詳細 | MakeIT</title>
      </Helmet>

      <OGPDetailContainer url={searchParams.get('url')} />
    </NavigationWithHeader>
  );
};
