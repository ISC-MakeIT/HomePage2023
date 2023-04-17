import { Role } from '@api/admin/members/roles';
import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Button,
  colors,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEventHandler, useRef } from 'react';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';
import { Modal } from 'src/components/molecules/admin/Modal';
import { CreateMemberFormInput } from '../../types/CreateMemberFormInput';

type CreateMemberModalProps = {
  isActive: boolean;
  roleList: Role[];
  handleOpen: () => void;
  handleClose: () => void;

  register: UseFormRegister<CreateMemberFormInput>;
  handleSubmit: UseFormHandleSubmit<CreateMemberFormInput>;
  handleCreateMember: SubmitHandler<CreateMemberFormInput>;
  icon?: string;

  handleIconUpload: (file: File) => void;

  errors: FieldErrors<CreateMemberFormInput>;
  error?: string;
};

export const CreateMemberModal = ({
  isActive,
  roleList,
  handleOpen,
  handleClose,
  icon,
  register,
  handleSubmit,
  handleCreateMember,
  handleIconUpload,
  errors,
  error,
}: CreateMemberModalProps) => {
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
        <FontAwesomeIcon icon={faPlus} /> メンバーを新規作成
      </Button>

      <Modal width={1080} isActive={isActive} handleClose={handleClose}>
        <AlertForError error={error} />

        <Box>
          <Typography variant='h6' component='h2'>
            メンバーを新規作成
          </Typography>
          <FormHelperText>
            メンバーの新規作成を行います。
            <br />※ 非表示の状態で作成が行われます。
          </FormHelperText>
        </Box>

        <Stack component='form' onSubmit={handleSubmit(handleCreateMember)} spacing={4}>
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
                  error={'description' in errors}
                  helperText={errors.description?.message}
                  {...register('description', {
                    required: '自己紹介は必須項目です。',
                    maxLength: { value: 255, message: '自己紹介は255文字未満でなければなりません。' },
                  })}
                />
              </Box>

              <Stack flexDirection={'row'} columnGap='1rem'>
                <Box width='100%'>
                  <TextField
                    fullWidth
                    variant='outlined'
                    label='ユーザー名'
                    type='text'
                    error={'username' in errors}
                    helperText={errors.username?.message}
                    {...register('username', {
                      required: 'ユーザー名は必須項目です。',
                      maxLength: { value: 255, message: 'ユーザー名は255文字未満でなければなりません。' },
                    })}
                  />
                </Box>
                <Box width='100%'>
                  <TextField
                    fullWidth
                    variant='outlined'
                    label='パスワード'
                    type='password'
                    error={'password' in errors}
                    helperText={errors.password?.message}
                    {...register('password', {
                      required: 'パスワードは必須項目です。',
                      maxLength: { value: 255, message: 'パスワードは255文字未満でなければなりません。' },
                    })}
                  />
                </Box>
              </Stack>

              <Stack>
                <FormLabel sx={{ fontWeight: 'bold' }}>ロール</FormLabel>
                <FormHelperText sx={{ mx: 0 }}>ロールによって、アクセス権限が変わります。</FormHelperText>
                <Select
                  defaultValue={roleList.length !== 0 ? roleList[2].roleId : null}
                  sx={{ mt: 1 }}
                  {...register('roleId', { required: true })}
                >
                  {roleList.map((role) => (
                    <MenuItem key={role.roleId} value={role.roleId}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Stack>
          </Stack>

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
