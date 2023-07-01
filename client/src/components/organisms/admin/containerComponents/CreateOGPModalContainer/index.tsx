import { type PostResponse } from '@api/admin/members';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import axios from 'axios';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAlert } from 'src/modules/hooks/useAlert';
import { ADMIN_ROUTE_FULL_PATH_MAP } from 'src/routes/routePath';
import { type CreateOGPFormInput } from '../../types/CreateOGPFormInput';
import { apiCreateOGP } from '@api/admin/ogps';
import { CreateOGPModal } from '../../presentationalComponents/CreateOGPModal';
import { useRouter } from 'next/router';

export const CreateOGPModalContainer = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateOGPFormInput>();
  const [thumbnailForDisplay, setThumbnailForDisplay] = useState<string>();
  const [error, setError] = useState<string>();
  const [isActive, setIsActive] = useState(false);

  const alert = useAlert();
  const userToken = useSelector(selectUserToken);
  const router = useRouter();

  const handleOpen = () => {
    setIsActive(true);
  };
  const handleClose = () => {
    setIsActive(false);
  };

  const handleCreateOGP: SubmitHandler<CreateOGPFormInput> = async (createOGPFormInput) => {
    try {
      const response = await apiCreateOGP(userToken, createOGPFormInput);
      alert.show({ type: 'success', content: response.message! });
      reset();
      setIsActive(false);
      setThumbnailForDisplay(undefined);

      router.push(ADMIN_ROUTE_FULL_PATH_MAP.OGP_SETTING);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const status = e.response!.status;
        const responseData = e.response!.data as PostResponse;

        if (status === 400 && responseData.message !== '') {
          setError(responseData.message);
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

        setError(responseData.message);
        return;
      }

      setError(
        '不明なエラーが発生したため、少し時間を置いてからもう一度お試しください。\n時間を置いても同様のエラーが発生する場合は、管理者にお問い合わせください。'
      );
    }
  };

  const handleThumbnailUpload = (thumbnail: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(thumbnail);
    setValue('thumbnail', thumbnail);

    reader.onload = (e) => {
      const base64Text = e.target!.result as string;
      setThumbnailForDisplay(base64Text);
    };
  };

  return (
    <CreateOGPModal
      handleOpen={handleOpen}
      handleClose={handleClose}
      isActive={isActive}
      thumbnail={thumbnailForDisplay}
      handleCreateOGP={handleCreateOGP}
      handleSubmit={handleSubmit}
      register={register}
      handleThumbnailUpload={handleThumbnailUpload}
      errors={errors}
      error={error}
    />
  );
};
