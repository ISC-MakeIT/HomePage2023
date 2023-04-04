import { apiWorks, GetResponse, Work } from '@api/works';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useAppSelector } from '@redux/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { WorkList } from '../../presentationalComponents/WorkList';

export const WorkListContainer = () => {
  const [workList, setWorkList] = useState<Work[]>([]);
  const [error, setError] = useState<string>();

  const userToken = useAppSelector(selectUserToken);
  const state: { refresh?: boolean } = useLocation().state;

  useEffect(() => {
    const main = async () => {
      try {
        const response = await apiWorks(userToken);
        setWorkList(response);
        setError(undefined);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const status = e.response!.status;
          const responseData: GetResponse = e.response!.data;

          if (status === 401) {
            return;
          }

          if (status === 403) {
            setError('このページにアクセスするためには、MEMBER以上の権限がなければなりません。');
            return;
          }

          setError(responseData.message!);
          return;
        }

        setError(
          '不明なエラーが発生したため、少し時間を置いてからもう一度お試しください。\n時間を置いても同様のエラーが発生する場合は、管理者にお問い合わせください。',
        );
        return;
      }
    };

    main();
  }, [state]);

  return <WorkList workList={workList} error={error} />;
};