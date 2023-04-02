import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, FormHelperText, Stack, TextField, Typography } from '@mui/material';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';
import { Modal } from 'src/components/molecules/admin/Modal';
import { CreateWorkFormInput } from '../../types/CreateWorkFormInput';

type CreateWorkModalProps = {
  isActive: boolean;
  handleOpen: () => void;
  handleClose: () => void;

  register: UseFormRegister<CreateWorkFormInput>;
  handleSubmit: UseFormHandleSubmit<CreateWorkFormInput>;
  handleCreateWork: SubmitHandler<CreateWorkFormInput>;

  errors: FieldErrors<CreateWorkFormInput>;
  error?: string;
};

export const CreateWorkModal = ({
  isActive,
  handleOpen,
  handleClose,
  register,
  handleSubmit,
  handleCreateWork,
  errors,
  error,
}: CreateWorkModalProps) => {
  return (
    <>
      <Button onClick={handleOpen} variant='outlined' sx={{ display: 'flex', columnGap: 1, width: '15rem' }}>
        <FontAwesomeIcon icon={faPlus} /> 活動実績を新規作成
      </Button>

      <Modal width={1080} isActive={isActive} handleClose={handleClose}>
        <AlertForError error={error} />

        <Box>
          <Typography variant='h6' component='h2'>
            活動実績を新規作成
          </Typography>
          <FormHelperText>
            活動実績の新規作成を行います。
            <br />※ 非表示の状態で作成が行われます。
          </FormHelperText>
        </Box>

        <Stack component='form' onSubmit={handleSubmit(handleCreateWork)} spacing={4}>
          <TextField
            fullWidth
            variant='outlined'
            label='タイトル'
            type='text'
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
            label='内容'
            {...register('contents', {
              required: '内容は必須項目です。',
              maxLength: { value: 20000, message: '内容は255文字未満でなければなりません。' },
            })}
          />

          <Stack flexDirection='row' columnGap={2} justifyContent='right'>
            <Button type='button' onClick={handleClose} variant='text'>
              キャンセル
            </Button>
            <Button type='submit' variant='contained' color='success'>
              作成
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};
