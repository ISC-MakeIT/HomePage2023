import { apiCreateMember } from '@api/admin/members';
import { apiRoles, Role } from '@api/admin/members/roles';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'src/modules/hooks/useAlert';
import { ADMIN_ROUTE_FULL_PATH_MAP } from 'src/routes/routePath';
import { CreateMemberModal } from '../../presentationalComponents/CreateMemberModal';
import { CreateMemberFormInput } from '../../types/CreateMemberFormInput';

export const CreateMemberModalContainer = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateMemberFormInput>();
  const [iconForDisplay, setIconForDisplay] = useState<string>();
  const [error, setError] = useState<string>();
  const [isActive, setIsActive] = useState(false);
  const [roleList, setRoleList] = useState<Role[]>([]);

  const alert = useAlert();
  const userToken = useSelector(selectUserToken);
  const navigate = useNavigate();

  useEffect(() => {
    const main = async () => {
      try {
        setRoleList(await apiRoles(userToken));
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const responseData = e.response!.data;
          const status = e.response!.status;

          if (status === 400) {
            alert.show({ type: 'error', content: Object.values(responseData.errors!).join('\n') });
            return;
          }

          if (status === 401) {
            return;
          }

          if (status === 403) {
            alert.show({
              type: 'error',
              content: 'このページにアクセスするためには、ADMIN以上の権限がなければなりません。',
            });
            return;
          }

          if (responseData.message) {
            alert.show({ type: 'error', content: responseData.message! });
            return;
          }
        }

        alert.show({
          type: 'error',
          content:
            '不明なエラーが発生したため、少し時間を置いてからもう一度お試しください。\n時間を置いても同様のエラーが発生する場合は、管理者にお問い合わせください。',
        });
      }
    };
    main();
  }, []);

  const handleOpen = () => setIsActive(true);
  const handleClose = () => setIsActive(false);

  const handleCreateMember: SubmitHandler<CreateMemberFormInput> = async (createMemberFormInput) => {
    try {
      const response = await apiCreateMember(userToken, createMemberFormInput);
      alert.show({ type: 'success', content: response.message! });
      reset();
      setIsActive(false);
      setIconForDisplay(undefined);

      navigate(ADMIN_ROUTE_FULL_PATH_MAP.MEMBERS, {
        state: { refresh: true },
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const status = e.response!.status;
        const responseData = e.response!.data;

        if (status === 400 && responseData.message) {
          setError(responseData.message!);
          return;
        }

        if (status === 400) {
          setError(Object.values(responseData.errors!).join('\n'));
          return;
        }

        if (status === 403) {
          setError('メンバーを作成する権限がありません。');
          return;
        }

        setError(responseData.message!);
        return;
      }

      setError(
        '不明なエラーが発生したため、少し時間を置いてからもう一度お試しください。\n時間を置いても同様のエラーが発生する場合は、管理者にお問い合わせください。',
      );
    }
  };

  const handleIconUpload = (icon: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(icon);
    setValue('icon', icon);

    reader.onload = (e) => {
      const base64Text = e.target!.result as string;
      setIconForDisplay(base64Text);
    };
  };

  return (
    <CreateMemberModal
      handleOpen={handleOpen}
      handleClose={handleClose}
      isActive={isActive}
      roleList={roleList}
      icon={iconForDisplay}
      handleCreateMember={handleCreateMember}
      handleSubmit={handleSubmit}
      register={register}
      handleIconUpload={handleIconUpload}
      errors={errors}
      error={error}
    />
  );
};
