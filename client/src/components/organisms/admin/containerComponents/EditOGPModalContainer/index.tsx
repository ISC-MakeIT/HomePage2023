import { selectUserToken } from '@redux/actions/user/userTokenReducer';
import { useAppSelector } from '@redux/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'src/modules/hooks/useAlert';
import { useProcessingLine } from 'src/modules/hooks/useProcessingLine';
import { ADMIN_ROUTE_FULL_PATH_MAP } from 'src/routes/routePath';
import { apiOGP, type GetResponse, type OGP } from '@api/admin/ogps/detail';
import { type EditOGPFormInput } from '../../types/EditOGPFormInput';
import { apiEditOGP, type PutResponse } from '@api/admin/ogps';
import { EditOGPModal } from '../../presentationalComponents/EditOGPModal';

interface EditOGPModalContainerProps {
  url: string | null;
}

export const EditOGPModalContainer = ({ url }: EditOGPModalContainerProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [thumbnailForDisplay, setThumbnailForDisplay] = useState<string>();
  const [ogp, setOgp] = useState<OGP>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditOGPFormInput>();
  const userToken = useAppSelector(selectUserToken);
  const alert = useAlert();
  const processingLine = useProcessingLine();
  const navigate = useNavigate();

  useEffect(() => {
    const main = async () => {
      try {
        processingLine.show();

        const response = await apiOGP(userToken, { url: url! });
        setOgp(response);
        setThumbnailForDisplay(response.thumbnail);

        processingLine.hide();
      } catch (e) {
        processingLine.hide();

        const MILLI_SECOND_COUNTS_TO_HIDE_FOR_ALERT = 1000 * 10;

        if (axios.isAxiosError(e)) {
          const responseData = e.response!.data as GetResponse;
          const status = e.response!.status;

          if (status === 400) {
            alert.show(
              {
                type: 'error',
                content: Object.values(responseData.errors!).join('\n'),
              },
              MILLI_SECOND_COUNTS_TO_HIDE_FOR_ALERT
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
                content: 'このページにアクセスするためには、MEMBER以上の権限がなければなりません。',
              },
              MILLI_SECOND_COUNTS_TO_HIDE_FOR_ALERT
            );
            return;
          }

          if (status === 404) {
            alert.show(
              {
                type: 'error',
                content: '存在しないOGPです。',
              },
              MILLI_SECOND_COUNTS_TO_HIDE_FOR_ALERT
            );
            return;
          }

          if (responseData.message !== '') {
            alert.show(
              {
                type: 'error',
                content: responseData.message!,
              },
              MILLI_SECOND_COUNTS_TO_HIDE_FOR_ALERT
            );
            return;
          }
        }

        alert.show(
          {
            type: 'error',
            content: '不明なエラーが発生したため、少し時間を置いてからもう一度お試しください。',
          },
          MILLI_SECOND_COUNTS_TO_HIDE_FOR_ALERT
        );
      }
    };

    main();
  }, [isActive]);

  const handleEditOGP: SubmitHandler<EditOGPFormInput> = async (editOGPFormInput) => {
    try {
      const response = await apiEditOGP(userToken, {
        _method: 'PUT',
        url: url!,
        title: editOGPFormInput.title,
        description: editOGPFormInput.description,
        keywords: editOGPFormInput.keywords,
        thumbnail: editOGPFormInput.thumbnail,
      });

      const milliSecondCountsToHide = 10000;

      alert.show(
        {
          type: 'success',
          content: response.message!,
        },
        milliSecondCountsToHide
      );
      setIsActive(false);
      navigate(ADMIN_ROUTE_FULL_PATH_MAP.OGP_SETTING);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const responseData = e.response!.data as PutResponse;
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

        if (responseData.message !== '') {
          setError(responseData.message);
          return;
        }
      }

      setError(
        '不明なエラーが発生したため、少し時間を置いてからもう一度お試しください。\n時間を置いても同様のエラーが発生する場合は、管理者にお問い合わせください。'
      );
    }
  };

  const handleIconUpload = (thumbnail: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(thumbnail);
    setValue('thumbnail', thumbnail);

    reader.onload = (e) => {
      const base64Text = e.target!.result as string;
      setThumbnailForDisplay(base64Text);
    };
  };

  if (ogp === undefined || thumbnailForDisplay === undefined) {
    return <></>;
  }

  return (
    <EditOGPModal
      isActive={isActive}
      ogp={ogp}
      thumbnail={thumbnailForDisplay}
      handleOpen={() => {
        setIsActive(true);
      }}
      handleClose={() => {
        setIsActive(false);
      }}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      error={error}
      handleEditOGP={handleEditOGP}
      handleIconUpload={handleIconUpload}
    />
  );
};
