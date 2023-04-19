import { apiWorks, type GetResponse, type Work } from '@api/admin/works';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useAppSelector } from '@redux/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { WorkList } from '../../presentationalComponents/WorkList';
import { useProcessingLine } from 'src/modules/hooks/useProcessingLine';

export const WorkListContainer = () => {
  const [workList, setWorkList] = useState<Work[]>([]);
  const [error, setError] = useState<string>();

  const userToken = useAppSelector(selectUserToken);
  const state = useLocation().state as { refresh?: boolean };
  const proccessingLine = useProcessingLine();

  useEffect(() => {
    const main = async () => {
      try {
        proccessingLine.show();

        const response = await apiWorks(userToken);
        setWorkList(response);
        setError(undefined);

        proccessingLine.hide();
      } catch (e) {
        proccessingLine.hide();

        if (axios.isAxiosError(e)) {
          const status = e.response!.status;
          const responseData = e.response!.data as GetResponse;

          if (status === 401) {
            return;
          }

          if (status === 403) {
            setError('このページにアクセスするためには、MEMBER以上の権限がなければなりません。');
            return;
          }

          setError(responseData.message);
          return;
        }

        setError(
          '不明なエラーが発生したため、少し時間を置いてからもう一度お試しください。\n時間を置いても同様のエラーが発生する場合は、管理者にお問い合わせください。'
        );
      }
    };

    main();
  }, [state]);

  return <WorkList workList={workList} error={error} />;
};
