import { apiMembers, type Member, type GetResponse } from '@api/admin/members';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useAppSelector } from '@redux/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MemberList } from '../../presentationalComponents/MemberList';
import { useProcessingLine } from 'src/modules/hooks/useProcessingLine';

export const MemberListContainer = () => {
  const [memberList, setMemberList] = useState<Member[]>([]);
  const [error, setError] = useState<string>();
  const state = useLocation().state as { refresh?: boolean };
  const proccessingLine = useProcessingLine();

  const userToken = useAppSelector(selectUserToken);

  useEffect(() => {
    const main = async () => {
      try {
        proccessingLine.show();

        const response = await apiMembers(userToken);
        setError(undefined);
        setMemberList(response);

        proccessingLine.hide();
      } catch (e) {
        proccessingLine.hide();

        if (axios.isAxiosError(e)) {
          const responseData = e.response!.data as GetResponse;
          const status = e.response!.status;

          if (status === 400) {
            setError(Object.values(responseData.errors!).join('\n'));
            return;
          }

          if (status === 401) {
            return;
          }

          if (status === 403) {
            setError('このページにアクセスするためには、ADMIN以上の権限がなければなりません。');
            return;
          }

          if (responseData.message !== '') {
            setError(responseData.message);
            return;
          }
        }

        setError(
          '不明なエラーが発生したため、少し時間を置いてからもう一度お試しください。\n時間を置いても同様のエラーが発生する場合は、管理者にお問い合わせください。'
        );
      }
    };

    main();
  }, [state]);

  return <MemberList memberList={memberList} error={error} />;
};
