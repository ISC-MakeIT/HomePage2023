import { selectUserToken } from '../../../../../redux/actions/user/userTokenReducer';
import { useAppSelector } from '../../../../../redux/hooks';
import { LoggedInMenu } from '../../presentationalComponents/LoggedInMenu';
import { UnLoggedInMenu } from '../../presentationalComponents/UnLoggedInMenu';

export const MenuContainer = () => {
  const userToken = useAppSelector(selectUserToken);

  if (userToken === '') {
    return <UnLoggedInMenu />;
  }

  return <LoggedInMenu />;
};
