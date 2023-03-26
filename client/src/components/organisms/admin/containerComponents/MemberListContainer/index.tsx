import { apiMembers, Member, GetResponse } from '@api/member';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useAppSelector } from '@redux/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE_FULL_PATH_MAP } from 'src/routes/routePath';
import { MemberList } from '../../presentationalComponents/MemberList';

export const MemberListContainer = () => {
  const [memberList, setMemberList] = useState<Member[]>([]);
  const [error, setError] = useState<string>();
  const userToken = useAppSelector(selectUserToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken === '') {
      navigate(ADMIN_ROUTE_FULL_PATH_MAP.LOGIN);
      return;
    }

    const main = async () => {
      try {
        const response = await apiMembers(userToken);
        setError(undefined);
        setMemberList(response);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const responseData: GetResponse = e.response!.data!;
          const status = e.response!.status;

          if (status === 400) {
            setError(Object.values(responseData.errors!).join('\n'));
            return;
          }

          if (status === 403) {
            setError('このページにアクセスするためには、ADMIN以上の権限がなければなりません。');
            return;
          }

          if (responseData.message) {
            setError(responseData.message!);
            return;
          }
        }

        setError(
          '不明なエラーが発生したため、少し時間を置いてからもう一度お試しください。\n時間を置いても同様のエラーが発生する場合は、管理者にお問い合わせください。',
        );
      }
    };

    main();
  }, []);

  return <MemberList memberList={memberList} error={error} />;
};
