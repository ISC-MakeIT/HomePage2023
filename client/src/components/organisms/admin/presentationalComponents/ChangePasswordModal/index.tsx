import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, FormHelperText, Stack, TextField, Typography } from '@mui/material';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';
import { Modal } from 'src/components/molecules/admin/Modal';
import { ChangePasswordFormInput } from '../../types/ChangePasswordFormInput';

type hangePasswordModalProps = {
  isActive: boolean;
  handleOpen: () => void;
  handleClose: () => void;

  register: UseFormRegister<ChangePasswordFormInput>;
  handleSubmit: UseFormHandleSubmit<ChangePasswordFormInput>;
  handleChangePassword: SubmitHandler<ChangePasswordFormInput>;

  errors: FieldErrors<ChangePasswordFormInput>;
  error?: string;
};

export const ChangePasswordModal = ({
  handleOpen,
  handleClose,
  register,
  handleSubmit,
  handleChangePassword,
  isActive,
  errors,
  error,
}: hangePasswordModalProps) => {
  return (
    <>
      <Button onClick={handleOpen} variant='outlined' sx={{ display: 'flex', columnGap: 1, width: '15rem' }}>
        <FontAwesomeIcon icon={faEdit} /> パスワードを変更
      </Button>

      <Modal width={1080} isActive={isActive} handleClose={handleClose}>
        <AlertForError error={error} />

        <Box>
          <Typography variant='h6' component='h2'>
            パスワードを変更
          </Typography>
          <FormHelperText>パスワードの変更を行います。</FormHelperText>
        </Box>

        <Stack component='form' onSubmit={handleSubmit(handleChangePassword)} spacing={4}>
          <TextField
            fullWidth
            variant='outlined'
            label='古いパスワード'
            type='password'
            error={'oldPassword' in errors}
            helperText={errors.oldPassword?.message}
            {...register('oldPassword', {
              required: '古いパスワードは必須項目です。',
              maxLength: { value: 255, message: '古いパスワードは255文字未満でなければなりません。' },
            })}
          />
          <TextField
            fullWidth
            variant='outlined'
            label='新しいパスワード'
            type='password'
            error={'newPassword' in errors}
            helperText={errors.newPassword?.message}
            {...register('newPassword', {
              required: '新しいパスワードは必須項目です。',
              maxLength: { value: 255, message: '新しいパスワードは255文字未満でなければなりません。' },
            })}
          />

          <Stack flexDirection='row' columnGap={2} justifyContent='right'>
            <Button type='button' onClick={handleClose} variant='text'>
              キャンセル
            </Button>
            <Button type='submit' variant='contained' color='success'>
              変更を適応
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};
