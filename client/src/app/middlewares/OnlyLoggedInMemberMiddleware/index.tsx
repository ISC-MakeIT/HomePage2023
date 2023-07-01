import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useAppSelector } from '@redux/hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAlert } from 'src/modules/hooks/useAlert';
import { ADMIN_ROUTE_FULL_PATH_MAP } from 'src/routes/routePath';

export const OnlyLoggedInMemberMiddleware = () => {
  const userToken = useAppSelector(selectUserToken);
  const router = useRouter();
  const alert = useAlert();

  useEffect(() => {
    const userTokenIsEmpty = () => {
      return userToken === '';
    };

    if (userTokenIsEmpty()) {
      alert.delayShow(
        {
          type: 'error',
          content: 'ログインが必要です。',
        },
        5000,
        1000
      );
      router.push(ADMIN_ROUTE_FULL_PATH_MAP.LOGIN);
    }
  }, []);

  return <></>;
};
