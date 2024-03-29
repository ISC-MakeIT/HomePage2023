import { useEffect, useState } from 'react';
import { OGPDetail } from '../../presentationalComponents/OGPDetail';
import { type OGP, apiOGP, type GetResponse } from '@api/admin/ogps/detail';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useAppSelector } from '@redux/hooks';
import { useProcessingLine } from 'src/modules/hooks/useProcessingLine';
import axios from 'axios';

interface OGPDetailContainerProps {
  url: string | null;
}

export const OGPDetailContainer = ({ url }: OGPDetailContainerProps) => {
  const [ogp, setOgp] = useState<OGP>();
  const [error, setError] = useState<string>();
  const userToken = useAppSelector(selectUserToken);

  const processingLine = useProcessingLine();

  useEffect(() => {
    const main = async () => {
      try {
        processingLine.show();

        const response = await apiOGP(userToken, { url: url! });
        setOgp(response);

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
  }, []);

  return <OGPDetail ogp={ogp} error={error} />;
};
