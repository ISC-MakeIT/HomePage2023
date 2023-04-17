import { apiLogin, Response } from '@api/admin/members/login';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { setToken } from '@redux/actions/user/userTokenReducer';
import { useAppDispatch } from '@redux/hooks';
import { ADMIN_ROUTE_FULL_PATH_MAP } from '../../../../../routes/routePath';
import { LoginForm } from '../../presentationalComponents/LoginForm';
import { LoginFormInput } from '../../types/LoginFormInput';
import { useAlert } from 'src/modules/hooks/useAlert';
import { setUserId } from '@redux/actions/user/userIdReducer';
import { useRouter } from 'next/router';

export const LoginFormContainer = () => {
  const { register, handleSubmit } = useForm<LoginFormInput>();
  const [error, setError] = useState<string>();
  const dispatch = useAppDispatch();
  const alert = useAlert();
  const router = useRouter();

  const handleLogin: SubmitHandler<LoginFormInput> = async (loginFormInput) => {
    try {
      const response = await apiLogin(loginFormInput);
      dispatch(setToken(response.token));
      dispatch(setUserId(response.memberId));
      alert.show({
        type: 'success',
        content: response.message!,
      });
      router.push(ADMIN_ROUTE_FULL_PATH_MAP.TOP);
    } catch (err) {
      const isNotAxiosError = () => !(err instanceof AxiosError);

      if (isNotAxiosError()) {
        setError(
          '不明なエラーが発生したため、少し時間を置いてからもう一度お試しください。\n時間を置いても同様のエラーが発生する場合は、管理者にお問い合わせください。',
        );
        return;
      }

      const axiosErr = err as AxiosError;

      const isFailedLogin = () => axiosErr.response && axiosErr.response.data;

      if (isFailedLogin()) {
        const response: Response = axiosErr.response!.data!;
        setError(response.message);
        return;
      }

      setError(
        '不明なエラーが発生したため、少し時間を置いてからもう一度お試しください。\n時間を置いても同様のエラーが発生する場合は、管理者にお問い合わせください。',
      );
    }
  };
  return <LoginForm error={error} handleLogin={handleLogin} handleSubmit={handleSubmit} register={register} />;
};
