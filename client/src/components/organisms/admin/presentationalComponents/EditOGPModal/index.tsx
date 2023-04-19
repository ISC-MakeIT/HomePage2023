import { faEdit, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, FormHelperText, Stack, TextField, Typography } from '@mui/material';
import { type FieldErrors, type SubmitHandler, type UseFormHandleSubmit, type UseFormRegister } from 'react-hook-form';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';
import { Modal } from 'src/components/molecules/admin/Modal';
import { type OGP } from '@api/admin/ogps/detail';
import { type EditOGPFormInput } from '../../types/EditOGPFormInput';
import { type ChangeEventHandler, useRef } from 'react';
import { css } from '@emotion/react';

interface EditOGPModalProps {
  isActive: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  ogp: OGP;
  thumbnail: string;

  register: UseFormRegister<EditOGPFormInput>;
  handleSubmit: UseFormHandleSubmit<EditOGPFormInput>;
  handleEditOGP: SubmitHandler<EditOGPFormInput>;
  handleIconUpload: (file: File) => void;

  errors: FieldErrors<EditOGPFormInput>;

  error?: string;
}

export const EditOGPModal = ({
  isActive,
  handleOpen,
  handleClose,
  ogp,
  thumbnail,
  handleSubmit,
  handleEditOGP,
  handleIconUpload,
  register,
  errors,
  error,
}: EditOGPModalProps) => {
  const inputForFileUpload = useRef<HTMLInputElement>(null);
  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target;
    if (files == null) {
      return;
    }

    handleIconUpload(files[0]);
  };

  return (
    <Stack>
      <Button
        onClick={handleOpen}
        sx={{ display: 'flex', columnGap: 1, width: '6rem' }}
        color="primary"
        variant="outlined"
      >
        <FontAwesomeIcon icon={faEdit} />
        編集
      </Button>

      <Modal width={600} isActive={isActive} handleClose={handleClose}>
        <AlertForError error={error} />

        <Box>
          <Typography variant="h6" component="h2">
            OGPを編集
          </Typography>
          <FormHelperText>OGPの編集を行います。</FormHelperText>
        </Box>

        <Stack component="form" onSubmit={handleSubmit(handleEditOGP)} spacing={2}>
          <Stack spacing={1}>
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
              サムネイルをアップロード
            </Button>
          </Stack>

          <TextField
            fullWidth
            variant="outlined"
            label="タイトル"
            type="text"
            error={'title' in errors}
            helperText={errors.title?.message}
            defaultValue={ogp.title}
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
            defaultValue={ogp.description}
            {...register('description', {
              required: '説明文は必須項目です。',
              maxLength: { value: 255, message: '内容は255文字未満でなければなりません。' },
            })}
          />
          <TextField
            fullWidth
            error={'chip' in errors}
            helperText={errors.keywords?.message}
            defaultValue={ogp.keywords}
            {...register('keywords', {
              required: 'キーワードは必須項目です。',
              maxLength: { value: 1000, message: '内容は1000文字未満でなければなりません。' },
            })}
          />

          <Stack flexDirection="row" columnGap={1}>
            <Button onClick={handleClose} type="button" variant="text" color="error">
              キャンセル
            </Button>
            <Button type="submit" variant="contained" color="success">
              編集を適応
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
};
