import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, FormHelperText, Modal, Stack, Typography } from '@mui/material';

type DeleteMemberModelProps = {
  isActive: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleDeleteMember: () => void;
};

export const DeleteMemberModel = ({
  isActive,
  handleOpen,
  handleClose,
  handleDeleteMember,
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

      <Modal open={isActive} onClose={handleClose}>
        <Stack
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
          rowGap={4}
        >
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
        </Stack>
      </Modal>
    </Stack>
  );
};
