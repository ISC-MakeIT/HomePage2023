import { Role } from '@api/member/roles';
import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Textarea } from '@mui/joy';
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
import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';
import { Modal } from 'src/components/molecules/admin/Modal';
import { CreateMemberFormInput } from '../../types/CreateMemberFormInput';

type CreateMemberModalProps = {
  isActive: boolean;
  roleList: Role[];
  handleOpen: () => void;
  handleClose: () => void;
  error?: string;

  register: UseFormRegister<CreateMemberFormInput>;
  handleSubmit: UseFormHandleSubmit<CreateMemberFormInput>;
  handleCreateMember: SubmitHandler<CreateMemberFormInput>;
  icon?: string;

  handleIconUpload: (file: File) => void;
};

export const CreateMemberModal = ({
  isActive,
  roleList,
  handleOpen,
  handleClose,
  error,
  icon,
  register,
  handleSubmit,
  handleCreateMember,
  handleIconUpload,
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
                  <TextField fullWidth variant='outlined' label='名前' type='text' {...register('name')} />
                  <FormHelperText>※メンバー 一覧に表示される名前です。</FormHelperText>
                </Box>
                <Box width='100%'>
                  <TextField fullWidth variant='outlined' label='役職' type='text' {...register('jobTitle')} />
                  <FormHelperText>※サークル内での担当領域です。</FormHelperText>
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
                    {...register('discord')}
                  />
                  <TextField
                    fullWidth
                    variant='outlined'
                    label='Twitterユーザー名'
                    placeholder='@example'
                    type='text'
                    {...register('twitter')}
                  />
                  <TextField
                    fullWidth
                    variant='outlined'
                    label='Githubユーザー名'
                    type='text'
                    {...register('github')}
                  />
                </Stack>
                <FormHelperText>※各種SNSのユーザー名を入力してください。</FormHelperText>
              </Stack>

              <Box>
                <Textarea minRows={5} size='lg' placeholder='自己紹介' {...register('description')} />
                <FormHelperText>※メンバー 一覧に表示される自己紹介です。</FormHelperText>
              </Box>

              <Stack flexDirection={'row'} columnGap='1rem'>
                <Box width='100%'>
                  <TextField fullWidth variant='outlined' label='ユーザー名' type='text' {...register('username')} />
                  <FormHelperText>※ログイン時に使用するユーザー名です。</FormHelperText>
                </Box>
                <Box width='100%'>
                  <TextField
                    fullWidth
                    variant='outlined'
                    label='パスワード'
                    type='password'
                    {...register('password')}
                  />
                  <FormHelperText>
                    ※ログイン時に使用するパスワードです。
                    <br />
                    ※ログイン後、パスワードの変更を行うことを推奨します。
                  </FormHelperText>
                </Box>
              </Stack>

              <Stack>
                <FormLabel sx={{ fontWeight: 'bold' }}>ロールの変更</FormLabel>
                <FormHelperText sx={{ mx: 0 }}>ロールによって、アクセス権限が変わります。</FormHelperText>
                <Select
                  defaultValue={roleList.length !== 0 ? roleList[2].roleId : null}
                  sx={{ mt: 1 }}
                  {...register('roleId')}
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
