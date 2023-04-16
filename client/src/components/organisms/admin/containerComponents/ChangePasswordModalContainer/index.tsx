import { useState } from 'react';
import { ChangePasswordModal } from '../../presentationalComponents/ChangePasswordModal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ChangePasswordFormInput } from '../../types/ChangePasswordFormInput';
import { apiChangePassword } from '@api/admin/members/password';
import { useAppSelector } from '@redux/hooks';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import axios from 'axios';
import { ADMIN_ROUTE_FULL_PATH_MAP } from 'src/routes/routePath';
import { useRouter } from 'next/router';

export const ChangePasswordModalContainer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormInput>();
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string>();
  const userToken = useAppSelector(selectUserToken);
  const router = useRouter();

  const handleOpen = () => setIsActive(true);
  const handleClose = () => setIsActive(false);

  const handleChangePassword: SubmitHandler<ChangePasswordFormInput> = async (changePasswordFormInput) => {
    try {
      await apiChangePassword(userToken, changePasswordFormInput);
      setError(undefined);
      setIsActive(false);
      reset();
      router.push(ADMIN_ROUTE_FULL_PATH_MAP.MYPAGE);
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

        if (status === 401) {
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

  return (
    <ChangePasswordModal
      register={register}
      handleSubmit={handleSubmit}
      handleChangePassword={handleChangePassword}
      handleOpen={handleOpen}
      handleClose={handleClose}
      isActive={isActive}
      error={error}
      errors={errors}
    />
  );
};
