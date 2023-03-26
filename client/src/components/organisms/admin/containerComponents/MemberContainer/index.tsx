import { Member as APIMember } from '@api/member';
import { apiMember } from '@api/member/member';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useAppSelector } from '@redux/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE_FULL_PATH_MAP } from 'src/routes/routePath';
import { Member } from '../../presentationalComponents/Member';

type MemberContainerProps = {
  memberId: number;
};

export const MemberContainer = ({ memberId }: MemberContainerProps) => {
  const [member, setMember] = useState<APIMember>();
  const [error, setError] = useState<string>('');
  const userToken = useAppSelector(selectUserToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken === '') {
      navigate(ADMIN_ROUTE_FULL_PATH_MAP.LOGIN);
      return;
    }

    const main = async () => {
      try {
        const membersResponse = await apiMember(userToken, memberId);
        setMember(membersResponse);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const responseData = e.response!.data;
          const status = e.response!.status;

          if (status === 400) {
            setError(Object.values(responseData.errors!).join('\n'));
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

  const getMember = () => {
    const elseDefaultDisplayUnExist = (memberElement?: string) => {
      if (!memberElement || memberElement === '') {
        return '存在しません';
      }
      return memberElement;
    };

    if (!member) {
      return undefined;
    }

    return {
      ...member,
      discord: elseDefaultDisplayUnExist(member.discord),
      twitter: elseDefaultDisplayUnExist(member.twitter),
      github: elseDefaultDisplayUnExist(member.github),
    };
  };

  return <Member member={getMember()} error={error} />;
};
