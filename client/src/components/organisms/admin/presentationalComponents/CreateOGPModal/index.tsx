import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, FormHelperText, Stack, TextField, Typography } from '@mui/material';
import { type ChangeEventHandler, useRef } from 'react';
import { type FieldErrors, type SubmitHandler, type UseFormHandleSubmit, type UseFormRegister } from 'react-hook-form';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';
import { Modal } from 'src/components/molecules/admin/Modal';
import { type CreateOGPFormInput } from '../../types/CreateOGPFormInput';
import { css } from '@emotion/react';

interface CreateOGPModalProps {
  isActive: boolean;
  handleOpen: () => void;
  handleClose: () => void;

  register: UseFormRegister<CreateOGPFormInput>;
  handleSubmit: UseFormHandleSubmit<CreateOGPFormInput>;
  handleCreateOGP: SubmitHandler<CreateOGPFormInput>;
  thumbnail?: string;

  handleThumbnailUpload: (file: File) => void;

  errors: FieldErrors<CreateOGPFormInput>;
  error?: string;
}

export const CreateOGPModal = ({
  isActive,
  handleOpen,
  handleClose,
  thumbnail,
  register,
  handleSubmit,
  handleCreateOGP,
  handleThumbnailUpload,
  errors,
  error,
}: CreateOGPModalProps) => {
  const inputForFileUpload = useRef<HTMLInputElement>(null);
  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target;
    if (files == null) {
      return;
    }

    handleThumbnailUpload(files[0]);
  };

  return (
    <>
      <Button onClick={handleOpen} variant="outlined" sx={{ display: 'flex', columnGap: 1, width: '15rem' }}>
        <FontAwesomeIcon icon={faPlus} /> メンバーを新規作成
      </Button>

      <Modal width={1080} isActive={isActive} handleClose={handleClose}>
        <AlertForError error={error} />

        <Box>
          <Typography variant="h6" component="h2">
            OGPを新規作成
          </Typography>
          <FormHelperText>
            OGPの新規作成を行います。
            <br />※ 非表示の状態で作成が行われます。
          </FormHelperText>
        </Box>

        <Stack component="form" onSubmit={handleSubmit(handleCreateOGP)} spacing={2}>
          <Stack flexDirection={'row'} columnGap={2}>
            <Stack spacing={8}>
              <div
                css={css`
                  width: 500px;
                  height: 261.7801px;
                  background-color: #777;
                  background-image: url(${thumbnail});
                  background-repeat: no-repeat;
                  background-size: cover;
                  background-position: center;
                `}
              />
              <input
                onChange={onChangeInput}
                hidden
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                ref={inputForFileUpload}
              />
              <Button
                onClick={() => {
                  inputForFileUpload.current!.click();
                }}
                sx={{ display: 'flex', alignItems: 'center', columnGap: '1rem' }}
                variant="outlined"
              >
                <FontAwesomeIcon icon={faUpload} />
                アイコンをアップロード
              </Button>
            </Stack>

            <Stack width="100%" spacing={2}>
              <TextField
                fullWidth
                variant="outlined"
                label="URL(pathname)"
                type="text"
                error={'url' in errors}
                helperText={errors.url?.message}
                {...register('url', {
                  required: 'URL(pathname)は必須項目です。',
                  maxLength: { value: 512, message: 'URL(pathname)は512文字未満でなければなりません。' },
                })}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="タイトル"
                type="text"
                error={'title' in errors}
                helperText={errors.title?.message}
                {...register('title', {
                  required: 'タイトルは必須項目です。',
                  maxLength: { value: 255, message: 'タイトルは255文字未満でなければなりません。' },
                })}
              />
              <TextField
                fullWidth
                multiline
                error={'description' in errors}
                helperText={errors.description?.message}
                minRows={5}
                label="説明文"
                {...register('description', {
                  required: '説明文は必須項目です。',
                  maxLength: { value: 255, message: '内容は255文字未満でなければなりません。' },
                })}
              />
              <TextField
                fullWidth
                label="キーワード"
                error={'chip' in errors}
                helperText={errors.keywords?.message}
                {...register('keywords', {
                  required: 'キーワードは必須項目です。',
                  maxLength: { value: 1000, message: '内容は1000文字未満でなければなりません。' },
                })}
              />
            </Stack>
          </Stack>

          <Stack justifyContent="right" flexDirection="row" columnGap={1}>
            <Button onClick={handleClose} type="button" variant="text" color="error">
              キャンセル
            </Button>
            <Button type="submit" variant="contained" color="success">
              新規作成
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};
