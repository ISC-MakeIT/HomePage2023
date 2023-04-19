import { useEffect, useState } from 'react';
import { OGPList } from '../../presentationalComponents/OGPList';
import { type GetResponse, type OGP, apiOGPList } from '@api/admin/ogps';
import { useAppSelector } from '@redux/hooks';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useProcessingLine } from 'src/modules/hooks/useProcessingLine';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export const OGPListContainer = () => {
  const [ogpList, setOgpList] = useState<OGP[]>();
  const [error, setError] = useState<string>();
  const userToken = useAppSelector(selectUserToken);
  const state = useLocation().state as { refresh?: boolean };
  const processingLine = useProcessingLine();

  useEffect(() => {
    const main = async () => {
      try {
        processingLine.show();

        const response = await apiOGPList(userToken);
        setOgpList(response);

        processingLine.hide();
      } catch (e) {
        processingLine.hide();

        if (axios.isAxiosError(e)) {
          const status = e.response!.status;
          const responseData = e.response!.data as GetResponse;

          if (status === 400 && responseData.message !== '') {
            setError(responseData.message);
            return;
          }

          if (status === 400) {
            setError(Object.values(responseData.errors!).join('\n'));
            return;
          }

          if (status === 401) {
            return;
          }

          if (status === 403) {
            setError('このページにアクセスするためには、MEMBER以上の権限がなければなりません。');
            return;
          }

          if (status === 404) {
            setError('OGPは存在しません。');
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

  return <OGPList ogpList={ogpList} error={error} />;
};
