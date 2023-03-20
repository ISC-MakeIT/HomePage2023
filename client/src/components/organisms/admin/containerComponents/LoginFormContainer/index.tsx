import { apiLogin, Response } from '@api/member/login';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { setToken } from '@redux/actions/user/userTokenReducer';
import { useAppDispatch } from '@redux/hooks';
import { ADMIN_ROUTE_FULL_PATH_MAP } from '../../../../../routes/routePath';
import { LoginForm } from '../../presentationalComponents/LoginForm';
import { LoginFormInput } from '../../types/LoginFormInput';

export const LoginFormContainer = () => {
  const { register, handleSubmit } = useForm<LoginFormInput>();
  const [error, setError] = useState<string>();
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const handleLogin: SubmitHandler<LoginFormInput> = async (loginFormInput) => {
    try {
      const response = await apiLogin(loginFormInput);
      dispatch(setToken(response.token));
      navigation(ADMIN_ROUTE_FULL_PATH_MAP.TOP);
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