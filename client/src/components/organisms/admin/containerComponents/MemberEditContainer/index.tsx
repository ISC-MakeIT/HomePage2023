import { Member } from '@api/member';
import { apiChangeActive } from '@api/member/active';
import { apiMember } from '@api/member/member';
import { apiChangeRole, apiRoles, Role } from '@api/member/roles';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useAppSelector } from '@redux/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'src/modules/hooks/useAlert';
import { ADMIN_ROUTE_FULL_PATH_MAP } from 'src/routes/routePath';
import { MemberEdit } from '../../presentationalComponents/MemberEdit';
import { EditMemberFormInput } from '../../types/EditMemberFormInput';

type MemberEditContainerProps = {
  memberId: number;
};

export const MemberEditContainer = ({ memberId }: MemberEditContainerProps) => {
  const [member, setMember] = useState<Member>();
  const { register, handleSubmit } = useForm<EditMemberFormInput>();
  const [roleList, setRoleList] = useState<Role[]>([]);
  const [error, setError] = useState<string>('');
  const userToken = useAppSelector(selectUserToken);
  const alert = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken === '') {
      alert.show({
        type: 'error',
        content: 'ログインが必要です。',
      });
      navigate(ADMIN_ROUTE_FULL_PATH_MAP.LOGIN);
      return;
    }

    const main = async () => {
      try {
        const memberResponse = await apiMember(userToken, memberId);
        const rolesResponse = await apiRoles(userToken);
        setRoleList(rolesResponse);
        setMember(memberResponse);
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

  const handleEditMember: SubmitHandler<EditMemberFormInput> = async (editMemberFormInput) => {
    try {
      const changeRoleResponse = await apiChangeRole(userToken, memberId, editMemberFormInput.roleId);
      const changeActivityResponse = await apiChangeActive(
        userToken,
        memberId,
        editMemberFormInput.activityState === 'active',
      );
      alert.show({
        type: 'success',
        content: changeRoleResponse.message!,
      });
      alert.show({
        type: 'success',
        content: changeActivityResponse.message!,
      });

      navigate(ADMIN_ROUTE_FULL_PATH_MAP.MEMBERS);
    } catch (e) {
      setError(
        '不明なエラーが発生したため、少し時間を置いてからもう一度お試しください。\n時間を置いても同様のエラーが発生する場合は、管理者にお問い合わせください。',
      );
    }
  };

  return (
    <MemberEdit
      member={member}
      roleList={roleList}
      error={error}
      register={register}
      handleSubmit={handleSubmit}
      handleEditMember={handleEditMember}
    />
  );
};
