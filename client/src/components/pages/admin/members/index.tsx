import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { MemberListContainer } from 'src/components/organisms/admin/containerComponents/MemberListContainer';
import { NavigationWithHeader } from '../../../templates/admin/NavigraitonWithHeader';

export const Members = () => {
  return (
    <NavigationWithHeader>
      <Helmet>
        <title>メンバー一覧 | MakeIT</title>
      </Helmet>

      <Button variant='outlined' sx={{ display: 'flex', columnGap: 1, width: '15rem' }}>
        <FontAwesomeIcon icon={faPlus} /> メンバーを新規作成
      </Button>
      <MemberListContainer />
    </NavigationWithHeader>
  );
};
