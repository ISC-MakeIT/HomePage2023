import { apiWork, GetResponse, Work as APIWork } from '@api/works/work';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useAppSelector } from '@redux/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useProcessingLine } from 'src/modules/hooks/useProcessingLine';
import { Work } from '../../presentationalComponents/Work';

type WorkContainerProps = {
  workId: number;
};

export const WorkContainer = ({ workId }: WorkContainerProps) => {
  const [work, setWork] = useState<APIWork>();
  const [error, setError] = useState<string>();
  const userToken = useAppSelector(selectUserToken);
  const proccessingLine = useProcessingLine();

  useEffect(() => {
    const main = async () => {
      try {
        proccessingLine.show();

        const response = await apiWork(userToken, workId);
        setWork(response);

        proccessingLine.hide();
      } catch (e) {
        proccessingLine.hide();

        if (axios.isAxiosError(e)) {
          const status = e.response!.status;
          const responseData: GetResponse = e.request!.data;

          if (status === 400 && responseData.message) {
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
            setError('お知らせは存在しません。');
            return;
          }

          setError(responseData.message);
          return;
        }

        setError(
          '不明なエラーが発生したため、少し時間を置いてからもう一度お試しください。\n時間を置いても同様のエラーが発生する場合は、管理者にお問い合わせください。',
        );
        return;
      }
    };

    main();
  }, []);

  const proccessWorkFrom = (preWork: APIWork) => {
    const twoDigitZeroPaddingBy = (count: number) => {
      return String(count).padStart(2, '0');
    };

    const getDateFormatFrom = (isoDate: string) => {
      const date = new Date(isoDate);

      return `${date.getFullYear()} ${twoDigitZeroPaddingBy(date.getMonth() + 1)}/${twoDigitZeroPaddingBy(
        date.getDate(),
      )} ${twoDigitZeroPaddingBy(date.getHours())}:${twoDigitZeroPaddingBy(date.getMinutes())}`;
    };

    return {
      ...preWork,
      createdAt: getDateFormatFrom(preWork.createdAt),
      updatedAt: getDateFormatFrom(preWork.updatedAt),
    };
  };

  if (!work) {
    return <></>;
  }

  return <Work work={proccessWorkFrom(work)} error={error} />;
};
