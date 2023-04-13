import { Member } from '@api/members';
import { faUpload, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Button,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  colors,
} from '@mui/material';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';
import { Modal } from 'src/components/molecules/admin/Modal';
import { ACTIVITY_STATE_CONSTANT, EditMeFormInput } from '../../types/EditMeFormInput';
import { ChangeEventHandler, useRef } from 'react';

type EditMeModalProps = {
  member: Member;
  isActive: boolean;
  handleOpen: () => void;
  handleClose: () => void;

  register: UseFormRegister<EditMeFormInput>;
  handleSubmit: UseFormHandleSubmit<EditMeFormInput>;
  handleEditMe: SubmitHandler<EditMeFormInput>;
  icon?: string;

  handleIconUpload: (file: File) => void;

  errors: FieldErrors<EditMeFormInput>;
  error?: string;
};

export const EditMeModal = ({
  member,
  isActive,
  handleOpen,
  handleClose,
  register,
  handleSubmit,
  handleEditMe,
  icon,
  handleIconUpload,
  errors,
  error,
}: EditMeModalProps) => {
  const inputForFileUpload = useRef<HTMLInputElement>(null);
  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target;
    if (!files) {
      return;
    }

    handleIconUpload(files[0]);
  };

  return (
    <>
      <Button onClick={handleOpen} variant='outlined' sx={{ display: 'flex', columnGap: 1, width: '15rem' }}>
        <FontAwesomeIcon icon={faUserEdit} /> プロフィールを編集
      </Button>

      <Modal width={1080} isActive={isActive} handleClose={handleClose}>
        <AlertForError error={error} />

        <Box>
          <Typography variant='h6' component='h2'>
            プロフィールを編集
          </Typography>
          <FormHelperText>モラルに気をつけて記述しようね。</FormHelperText>
        </Box>

        <Stack component='form' onSubmit={handleSubmit(handleEditMe)} spacing={4}>
          <Stack flexDirection='row' columnGap={4}>
            <Stack spacing={1.5}>
              <Box
                sx={{
                  width: 300,
                  height: 300,
                  backgroundColor: colors.grey.A700,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundImage: `url(${icon})`,
                }}
              />

              <Button
                onClick={() => inputForFileUpload.current!.click()}
                sx={{ display: 'flex', alignItems: 'center', columnGap: '1rem' }}
                variant='outlined'
              >
                <FontAwesomeIcon icon={faUpload} />
                アイコンをアップロード
              </Button>

              <input
                onChange={onChangeInput}
                hidden
                type='file'
                accept='image/png, image/jpg, image/jpeg'
                ref={inputForFileUpload}
              />
            </Stack>

            <Box sx={{ backgroundColor: colors.grey.A200, width: '1px' }} />

            <Stack spacing={1.5}>
              <Stack flexDirection={'row'} columnGap='1rem'>
                <Box width='100%'>
                  <TextField
                    fullWidth
                    variant='outlined'
                    label='名前'
                    type='text'
                    defaultValue={member.name}
                    error={'name' in errors}
                    helperText={errors.name?.message}
                    {...register('name', {
                      required: '名前は必須項目です。',
                      maxLength: { value: 255, message: '名前は255文字未満でなければなりません。' },
                    })}
                  />
                </Box>
                <Box width='100%'>
                  <TextField
                    fullWidth
                    variant='outlined'
                    label='役職'
                    type='text'
                    defaultValue={member.jobTitle}
                    error={'jobTitle' in errors}
                    helperText={errors.jobTitle?.message}
                    {...register('jobTitle', {
                      required: '役職は必須項目です。',
                      maxLength: { value: 255, message: '役職は255文字未満でなければなりません。' },
                    })}
                  />
                </Box>
              </Stack>

              <Stack>
                <Stack flexDirection={'row'} columnGap='1rem'>
                  <TextField
                    fullWidth
                    variant='outlined'
                    label='Discordユーザー名'
                    placeholder='example#0000'
                    type='text'
                    defaultValue={member.discord}
                    error={'discord' in errors}
                    helperText={errors.discord?.message}
                    {...register('discord', {
                      maxLength: { value: 255, message: 'Discordは255文字未満でなければなりません。' },
                    })}
                  />
                  <TextField
                    fullWidth
                    variant='outlined'
                    label='Twitterユーザー名'
                    placeholder='@example'
                    type='text'
                    defaultValue={member.twitter}
                    error={'twitter' in errors}
                    helperText={errors.twitter?.message}
                    {...register('twitter', {
                      maxLength: { value: 255, message: 'Twitterは255文字未満でなければなりません。' },
                    })}
                  />
                  <TextField
                    fullWidth
                    variant='outlined'
                    label='Githubユーザー名'
                    type='text'
                    defaultValue={member.github}
                    error={'github' in errors}
                    helperText={errors.github?.message}
                    {...register('github', {
                      maxLength: { value: 255, message: 'Githubは255文字未満でなければなりません。' },
                    })}
                  />
                </Stack>
              </Stack>

              <Box>
                <TextField
                  minRows={5}
                  fullWidth
                  multiline
                  placeholder='自己紹介'
                  defaultValue={member.description}
                  error={'description' in errors}
                  helperText={errors.description?.message}
                  {...register('description', {
                    required: '自己紹介は必須項目です。',
                    maxLength: { value: 255, message: '自己紹介は255文字未満でなければなりません。' },
                  })}
                />
              </Box>

              <Box>
                <RadioGroup
                  defaultValue={member!.isActive ? ACTIVITY_STATE_CONSTANT.ACTIVE : ACTIVITY_STATE_CONSTANT.NON_ACTIVE}
                  sx={{ p: 2, gap: 2 }}
                  id='activityState'
                  {...register('activityState')}
                >
                  <Stack flexDirection={'row'} columnGap={2}>
                    <Radio value={ACTIVITY_STATE_CONSTANT.ACTIVE} />
                    <div>
                      <FormLabel>表示</FormLabel>
                      <FormHelperText sx={{ mx: 0 }}>メンバーをトップページに表示します。</FormHelperText>
                    </div>
                  </Stack>
                  <Stack flexDirection={'row'} columnGap={2}>
                    <Radio value={ACTIVITY_STATE_CONSTANT.NON_ACTIVE} />
                    <div>
                      <FormLabel>非表示</FormLabel>
                      <FormHelperText sx={{ mx: 0 }}>メンバーをトップページから非表示にします。</FormHelperText>
                    </div>
                  </Stack>
                </RadioGroup>
              </Box>
            </Stack>
          </Stack>

          <Stack flexDirection='row' columnGap={2} justifyContent='right'>
            <Button type='button' onClick={handleClose} variant='text'>
              キャンセル
            </Button>
            <Button type='submit' variant='contained' color='success'>
              編集
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};
