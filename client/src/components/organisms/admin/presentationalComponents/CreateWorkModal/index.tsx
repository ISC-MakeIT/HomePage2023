import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, colors, FormHelperText, Stack, TextField, Typography } from '@mui/material';
import { type ChangeEventHandler, useRef } from 'react';
import { type FieldErrors, type SubmitHandler, type UseFormHandleSubmit, type UseFormRegister } from 'react-hook-form';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';
import { Modal } from 'src/components/molecules/admin/Modal';
import { type CreateWorkFormInput } from '../../types/CreateWorkFormInput';

interface CreateWorkModalProps {
  isActive: boolean;
  handleOpen: () => void;
  handleClose: () => void;

  register: UseFormRegister<CreateWorkFormInput>;
  handleSubmit: UseFormHandleSubmit<CreateWorkFormInput>;
  handleCreateWork: SubmitHandler<CreateWorkFormInput>;
  handlePictureUpload: (picture: File) => void;

  errors: FieldErrors<CreateWorkFormInput>;
  error?: string;

  picture?: string;
}

export const CreateWorkModal = ({
  isActive,
  handleOpen,
  handleClose,
  register,
  handleSubmit,
  handleCreateWork,
  handlePictureUpload,
  errors,
  error,
  picture,
}: CreateWorkModalProps) => {
  const inputForFileUpload = useRef<HTMLInputElement>(null);
  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target;
    if (files == null) {
      return;
    }

    handlePictureUpload(files[0]);
  };

  return (
    <>
      <Button onClick={handleOpen} variant="outlined" sx={{ display: 'flex', columnGap: 1, width: '15rem' }}>
        <FontAwesomeIcon icon={faPlus} /> 活動実績を新規作成
      </Button>

      <Modal width={1080} isActive={isActive} handleClose={handleClose}>
        <AlertForError error={error} />

        <Box>
          <Typography variant="h6" component="h2">
            活動実績を新規作成
          </Typography>
          <FormHelperText>
            活動実績の新規作成を行います。
            <br />※ 非表示の状態で作成が行われます。
          </FormHelperText>
        </Box>

        <Stack component="form" onSubmit={handleSubmit(handleCreateWork)} spacing={4}>
          <Stack flexDirection={'row'} columnGap={2}>
            <Stack spacing={1.5}>
              <Box
                sx={{
                  width: 300,
                  height: 400,
                  backgroundColor: colors.grey.A700,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundImage: `url(${picture})`,
                }}
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

              <input
                onChange={onChangeInput}
                hidden
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                ref={inputForFileUpload}
              />
            </Stack>

            <Box sx={{ backgroundColor: colors.grey.A200, width: '1px' }} />

            <Stack spacing={4} width="100%">
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
                error={'contents' in errors}
                helperText={errors.contents?.message}
                minRows={14}
                label="内容"
                {...register('contents', {
                  required: '内容は必須項目です。',
                  maxLength: { value: 20000, message: '内容は255文字未満でなければなりません。' },
                })}
              />
            </Stack>
          </Stack>

          <Stack flexDirection="row" columnGap={2} justifyContent="right">
            <Button type="button" onClick={handleClose} variant="text">
              キャンセル
            </Button>
            <Button type="submit" variant="contained" color="success">
              作成
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};
