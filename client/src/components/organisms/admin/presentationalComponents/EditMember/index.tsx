import { Member as APIMember } from '@api/members';
import { Role } from '@api/members/roles';
import { LinearProgress, Stack } from '@mui/joy';
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';
import { ACTIVITY_STATE_CONSTANT, EditMemberFormInput } from '../../types/EditMemberFormInput';

type EditMemberProps = {
  member?: APIMember;
  roleList: Role[];
  error?: string;
  register: UseFormRegister<EditMemberFormInput>;
  handleSubmit: UseFormHandleSubmit<EditMemberFormInput>;
  handleEditMember: SubmitHandler<EditMemberFormInput>;
};

export const EditMember = ({ member, roleList, error, register, handleSubmit, handleEditMember }: EditMemberProps) => {
  const isFindingMember = () => !member && !error;
  const isFailedFindMember = () => !member && error;

  if (isFailedFindMember()) {
    return (
      <>
        <AlertForError error={error} />
      </>
    );
  }

  if (isFindingMember()) {
    return (
      <>
        <LinearProgress color='primary' size='md' sx={{ position: 'fixed', top: 2, left: 0, width: '100vw' }} />
      </>
    );
  }

  return (
    <Stack rowGap={4}>
      <Stack spacing={2}>
        <FormControl component='form' onSubmit={handleSubmit(handleEditMember)}>
          <FormLabel sx={{ fontWeight: 'bold' }}>表示状態の変更</FormLabel>

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

          <Box sx={{ mt: 1 }}>
            <FormLabel sx={{ fontWeight: 'bold' }}>ロールの変更</FormLabel>
            <FormHelperText sx={{ mx: 0 }}>ロールによって、アクセス権限が変わります。</FormHelperText>
            <Select defaultValue={member!.roleId} sx={{ mt: 1 }} {...register('roleId')}>
              {roleList.map((role) => (
                <MenuItem key={role.roleId} value={role.roleId}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Button type='submit' variant='contained' sx={{ mt: 3 }}>
            変更を適応
          </Button>
        </FormControl>
      </Stack>
    </Stack>
  );
};
