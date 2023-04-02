import { ACTIVITY_STATE_CONSTANT, EditWorkFormInput } from '../../types/EditWorkFormInput';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, FormHelperText, FormLabel, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';
import { Modal } from 'src/components/molecules/admin/Modal';
import { Work } from '@api/works/work';

type EditWorkModalProps = {
  isActive: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  work: Work;

  register: UseFormRegister<EditWorkFormInput>;
  handleSubmit: UseFormHandleSubmit<EditWorkFormInput>;
  handleEditWork: SubmitHandler<EditWorkFormInput>;

  errors: FieldErrors<EditWorkFormInput>;

  error?: string;
};

export const EditWorkModal = ({
  isActive,
  handleOpen,
  handleClose,
  work,
  handleSubmit,
  handleEditWork,
  register,
  errors,
  error,
}: EditWorkModalProps) => {
  return (
    <Stack>
      <Button
        onClick={handleOpen}
        sx={{ display: 'flex', columnGap: 1, width: '6rem' }}
        color='primary'
        variant='outlined'
      >
        <FontAwesomeIcon icon={faEdit} />
        編集
      </Button>

      <Modal width={600} isActive={isActive} handleClose={handleClose}>
        <AlertForError error={error} />

        <Box>
          <Typography variant='h6' component='h2'>
            お知らせを編集
          </Typography>
          <FormHelperText>お知らせの編集を行います。</FormHelperText>
        </Box>

        <Stack component='form' onSubmit={handleSubmit(handleEditWork)} spacing={2}>
          <TextField
            fullWidth
            variant='outlined'
            label='タイトル'
            type='text'
            error={'title' in errors}
            helperText={errors.title?.message}
            defaultValue={work.title}
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
            defaultValue={work.contents}
            {...register('contents', {
              required: '内容は必須項目です。',
              maxLength: { value: 20000, message: '内容は255文字未満でなければなりません。' },
            })}
          />

          <Box>
            <RadioGroup
              defaultValue={work.isActive ? ACTIVITY_STATE_CONSTANT.ACTIVE : ACTIVITY_STATE_CONSTANT.NON_ACTIVE}
              sx={{ p: 2, gap: 2 }}
              id='activityState'
              {...register('activityState')}
            >
              <Stack flexDirection={'row'} columnGap={2}>
                <Radio value={ACTIVITY_STATE_CONSTANT.ACTIVE} />
                <div>
                  <FormLabel>表示</FormLabel>
                  <FormHelperText sx={{ mx: 0 }}>お知らせをトップページに表示します。</FormHelperText>
                </div>
              </Stack>
              <Stack flexDirection={'row'} columnGap={2}>
                <Radio value={ACTIVITY_STATE_CONSTANT.NON_ACTIVE} />
                <div>
                  <FormLabel>非表示</FormLabel>
                  <FormHelperText sx={{ mx: 0 }}>お知らせをトップページから非表示にします。</FormHelperText>
                </div>
              </Stack>
            </RadioGroup>
          </Box>

          <Stack flexDirection='row' columnGap={1}>
            <Button onClick={handleClose} type='button' variant='text' color='error'>
              キャンセル
            </Button>
            <Button type='submit' variant='contained' color='success'>
              編集を適応
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
};
