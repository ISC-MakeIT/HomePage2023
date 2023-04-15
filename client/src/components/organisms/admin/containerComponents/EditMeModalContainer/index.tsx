import { useEffect, useState } from 'react';
import { EditMeModal } from '../../presentationalComponents/EditMeModal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ACTIVITY_STATE_CONSTANT, EditMeFormInput } from '../../types/EditMeFormInput';
import { useAppSelector } from '@redux/hooks';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useNavigate } from 'react-router-dom';
import { Member, apiEditMe } from '@api/admin/members';
import axios from 'axios';
import { useProcessingLine } from 'src/modules/hooks/useProcessingLine';
import { apiChangeIcon } from '@api/admin/members/icon';
import { ADMIN_ROUTE_FULL_PATH_MAP } from 'src/routes/routePath';
import { apiMe } from '@api/admin/members/me';

export const EditMeModalContainer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditMeFormInput>();
  const [iconForDisplay, setIconForDisplay] = useState<string>();
  const [icon, setIcon] = useState<File>();
  const [error, setError] = useState<string>();
  const [member, setMember] = useState<Member>();
  const [isActive, setIsActive] = useState(false);

  const userToken = useAppSelector(selectUserToken);
  const processingLine = useProcessingLine();
  const navigate = useNavigate();

  useEffect(() => {
    const main = async () => {
      try {
        processingLine.show();

        const response = await apiMe(userToken);
        setMember(response);
        setIconForDisplay(response.thumbnail);

        processingLine.hide();
      } catch (e) {
        processingLine.hide();
        if (axios.isAxiosError(e)) {
          const responseData = e.response!.data;
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
  }, [isActive]);

  const handleOpen = () => setIsActive(true);
  const handleClose = () => setIsActive(false);

  const handleEditMe: SubmitHandler<EditMeFormInput> = async (editMeFormInput) => {
    try {
      await apiEditMe(userToken, {
        name: editMeFormInput.name,
        jobTitle: editMeFormInput.jobTitle,
        discord: editMeFormInput.discord,
        twitter: editMeFormInput.twitter,
        github: editMeFormInput.github,
        description: editMeFormInput.description,
        isActive: editMeFormInput.activityState === ACTIVITY_STATE_CONSTANT.ACTIVE,
      });

      if (icon) {
        await apiChangeIcon(userToken, icon);
      }

      setError(undefined);
      setIsActive(false);
      reset();
      navigate(ADMIN_ROUTE_FULL_PATH_MAP.MYPAGE, { state: { refresh: true } });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const responseData = e.response!.data;
        const status = e.response!.status;

        if (status === 400) {
          setError(Object.values(responseData.errors!).join('\n'));
          return;
        }

        if (status === 401) {
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

  const handleIconUpload = (icon: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(icon);
    setIcon(icon);

    reader.onload = (e) => {
      const base64Text = e.target!.result as string;
      setIconForDisplay(base64Text);
    };
  };

  if (!member) {
    return <></>;
  }

  return (
    <EditMeModal
      member={member}
      handleOpen={handleOpen}
      handleClose={handleClose}
      isActive={isActive}
      icon={iconForDisplay}
      handleEditMe={handleEditMe}
      handleSubmit={handleSubmit}
      register={register}
      handleIconUpload={handleIconUpload}
      errors={errors}
      error={error}
    />
  );
};
