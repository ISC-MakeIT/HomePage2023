import { apiEditWork } from '@api/admin/works';
import { apiWork, Work } from '@api/admin/works/work';
import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useAppSelector } from '@redux/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAlert } from 'src/modules/hooks/useAlert';
import { useProcessingLine } from 'src/modules/hooks/useProcessingLine';
import { ADMIN_ROUTE_FULL_PATH_MAP } from 'src/routes/routePath';
import { EditWorkModal } from '../../presentationalComponents/EditWorkModal';
import { ACTIVITY_STATE_CONSTANT, EditWorkFormInput } from '../../types/EditWorkFormInput';
import { useRouter } from 'next/router';

type EditWorkModalContainerProps = {
  workId: number;
};

export const EditWorkModalContainer = ({ workId }: EditWorkModalContainerProps) => {
  const [pictureForDisplay, setPictureForDisplay] = useState<string>();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [work, setWork] = useState<Work>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditWorkFormInput>();
  const userToken = useAppSelector(selectUserToken);
  const alert = useAlert();
  const processingLine = useProcessingLine();
  const router = useRouter();

  useEffect(() => {
    const main = async () => {
      try {
        processingLine.show();

        const response = await apiWork(userToken, workId);
        setWork(response);

        processingLine.hide();
      } catch (e) {
        processingLine.hide();

        const MILLI_SECOND_COUNTS_TO_HIDE_FOR_ALERT = 1000 * 10;

        if (axios.isAxiosError(e)) {
          const responseData = e.response!.data;
          const status = e.response!.status;

          if (status === 400) {
            alert.show(
              {
                type: 'error',
                content: Object.values(responseData.errors!).join('\n'),
              },
              MILLI_SECOND_COUNTS_TO_HIDE_FOR_ALERT,
            );
            return;
          }

          if (status === 401) {
            return;
          }

          if (status === 403) {
            alert.show(
              {
                type: 'error',
                content: 'このページにアクセスするためには、ADMIN以上の権限がなければなりません。',
              },
              MILLI_SECOND_COUNTS_TO_HIDE_FOR_ALERT,
            );
            return;
          }

          if (status === 404) {
            alert.show(
              {
                type: 'error',
                content: '存在しないお知らせです。',
              },
              MILLI_SECOND_COUNTS_TO_HIDE_FOR_ALERT,
            );
            return;
          }

          if (responseData.message) {
            alert.show(
              {
                type: 'error',
                content: responseData.message!,
              },
              MILLI_SECOND_COUNTS_TO_HIDE_FOR_ALERT,
            );
            return;
          }
        }

        alert.show(
          {
            type: 'error',
            content: '不明なエラーが発生したため、少し時間を置いてからもう一度お試しください。',
          },
          MILLI_SECOND_COUNTS_TO_HIDE_FOR_ALERT,
        );
      }
    };

    main();
  }, []);

  const handlePictureUpload = (picture: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(picture);
    setValue('picture', picture);

    reader.onload = (e) => {
      const base64Text = e.target!.result as string;
      setPictureForDisplay(base64Text);
    };
  };

  const handleEditWork: SubmitHandler<EditWorkFormInput> = async (editWorkFormInput) => {
    try {
      const response = await apiEditWork(userToken, {
        _method: 'PUT',
        workId: workId,
        title: editWorkFormInput.title,
        contents: editWorkFormInput.contents,
        picture: editWorkFormInput.picture,
        isActive: editWorkFormInput.activityState === ACTIVITY_STATE_CONSTANT.ACTIVE,
        currentVersion: work?.currentVersion!,
      });

      const milliSecondCountsToHide = 10000;

      alert.show(
        {
          type: 'success',
          content: response.message!,
        },
        milliSecondCountsToHide,
      );
      setIsActive(false);
      router.push(ADMIN_ROUTE_FULL_PATH_MAP.WORKS);
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
          setError('存在しないお知らせです。');
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

  if (!work) {
    return <></>;
  }

  return (
    <EditWorkModal
      isActive={isActive}
      handleOpen={() => setIsActive(true)}
      handleClose={() => setIsActive(false)}
      work={work}
      register={register}
      handleSubmit={handleSubmit}
      handleEditWork={handleEditWork}
      errors={errors}
      error={error}
      handlePictureUpload={handlePictureUpload}
      picture={pictureForDisplay}
    />
  );
};
