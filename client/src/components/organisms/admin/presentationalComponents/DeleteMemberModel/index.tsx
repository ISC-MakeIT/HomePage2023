import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, FormHelperText, Stack, Typography } from '@mui/material';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';
import { Modal } from 'src/components/molecules/admin/Modal';

type DeleteMemberModelProps = {
  isActive: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleDeleteMember: () => void;
  error?: string;
};

export const DeleteMemberModel = ({
  isActive,
  handleOpen,
  handleClose,
  handleDeleteMember,
  error,
}: DeleteMemberModelProps) => {
  return (
    <Stack>
      <Button
        onClick={handleOpen}
        sx={{ display: 'flex', columnGap: 1, width: '6rem' }}
        color='error'
        variant='outlined'
      >
        <FontAwesomeIcon icon={faTrash} />
        削除
      </Button>

      <Modal isActive={isActive} handleClose={handleClose}>
        <AlertForError error={error} />
        <Box>
          <Typography variant='h6' component='h2'>
            メンバーを削除
          </Typography>
          <FormHelperText>
            メンバーの削除を行います。 <br />
            間違えて削除してしまった場合は、管理者にお問い合わせください。
          </FormHelperText>
        </Box>
        <Stack flexDirection='row' columnGap={2}>
          <Button onClick={handleClose} variant='outlined'>
            キャンセル
          </Button>
          <Button onClick={handleDeleteMember} variant='contained' color='error'>
            削除
          </Button>
        </Stack>
      </Modal>
    </Stack>
  );
};