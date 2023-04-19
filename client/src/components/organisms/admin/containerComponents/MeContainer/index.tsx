import { type Member as APIMember } from '@api/admin/members';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useAppSelector } from '@redux/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useProcessingLine } from 'src/modules/hooks/useProcessingLine';
import { Member } from '../../presentationalComponents/Member';
import { useLocation } from 'react-router-dom';
import { type GetResponse, apiMe } from '@api/admin/members/me';

export const MeContainer = () => {
  const [member, setMember] = useState<APIMember>();
  const [error, setError] = useState<string>('');
  const userToken = useAppSelector(selectUserToken);
  const proccessingLine = useProcessingLine();
  const state = useLocation().state as { refresh?: boolean };

  useEffect(() => {
    const main = async () => {
      try {
        proccessingLine.show();

        const membersResponse = await apiMe(userToken);
        setMember(membersResponse);

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

          if (status === 404) {
            setError('存在しないメンバーです。');
            return;
          }

          if (responseData.message !== '') {
            setError(responseData.message!);
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

  const processMemberFrom = (preMember: APIMember) => {
    const elseDefaultDisplayUnExist = (memberElement?: string) => {
      if (memberElement === '') {
        return '存在しません';
      }
      return memberElement;
    };

    return {
      ...preMember,
      discord: elseDefaultDisplayUnExist(preMember.discord),
      twitter: elseDefaultDisplayUnExist(preMember.twitter),
      github: elseDefaultDisplayUnExist(preMember.github),
    };
  };

  if (member == null) {
    return <></>;
  }

  return <Member member={processMemberFrom(member)} error={error} />;
};
