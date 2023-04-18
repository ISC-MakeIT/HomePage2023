import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, FormHelperText, Stack, TextField, Typography } from '@mui/material';
import { type FieldErrors, type SubmitHandler, type UseFormHandleSubmit, type UseFormRegister } from 'react-hook-form';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';
import { Modal } from 'src/components/molecules/admin/Modal';
import { type CreateNotificationFormInput } from '../../types/CreateNotificationFormInput';

interface CreateMemberModalProps {
  isActive: boolean;
  handleOpen: () => void;
  handleClose: () => void;

  register: UseFormRegister<CreateNotificationFormInput>;
  handleSubmit: UseFormHandleSubmit<CreateNotificationFormInput>;
  handleCreateNotification: SubmitHandler<CreateNotificationFormInput>;

  errors: FieldErrors<CreateNotificationFormInput>;
  error?: string;
}

export const CreateNotificationModal = ({
  isActive,
  handleOpen,
  handleClose,
  register,
  handleSubmit,
  handleCreateNotification,
  errors,
  error,
}: CreateMemberModalProps) => {
  return (
    <>
      <Button onClick={handleOpen} variant="outlined" sx={{ display: 'flex', columnGap: 1, width: '15rem' }}>
        <FontAwesomeIcon icon={faPlus} /> お知らせを新規作成
      </Button>

      <Modal width={1080} isActive={isActive} handleClose={handleClose}>
        <AlertForError error={error} />

        <Box>
          <Typography variant="h6" component="h2">
            お知らせを新規作成
          </Typography>
          <FormHelperText>
            お知らせの新規作成を行います。
            <br />※ 非表示の状態で作成が行われます。
          </FormHelperText>
        </Box>

        <Stack component="form" onSubmit={handleSubmit(handleCreateNotification)} spacing={4}>
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
            minRows={5}
            label="内容"
            {...register('contents', {
              required: '内容は必須項目です。',
              maxLength: { value: 20000, message: '内容は255文字未満でなければなりません。' },
            })}
          />

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
