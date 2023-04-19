import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, FormHelperText, Stack, Typography } from '@mui/material';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';
import { Modal } from 'src/components/molecules/admin/Modal';

interface DeleteNotificationModelProps {
  isActive: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleDeleteNotification: () => void;
  error?: string;
}

export const DeleteNotificationModel = ({
  isActive,
  handleOpen,
  handleClose,
  handleDeleteNotification,
  error,
}: DeleteNotificationModelProps) => {
  return (
    <Stack>
      <Button onClick={handleOpen} sx={{ display: 'flex', columnGap: 1, width: '6rem' }} color="error" variant="text">
        <FontAwesomeIcon icon={faTrash} />
        削除
      </Button>

      <Modal isActive={isActive} handleClose={handleClose}>
        <AlertForError error={error} />
        <Box>
          <Typography variant="h6" component="h2">
            お知らせを削除
          </Typography>
          <FormHelperText>
            お知らせの削除を行います。 <br />
            間違えて削除してしまった場合は、管理者にお問い合わせください。
          </FormHelperText>
        </Box>
        <Stack flexDirection="row" columnGap={2}>
          <Button onClick={handleClose} variant="outlined">
            キャンセル
          </Button>
          <Button onClick={handleDeleteNotification} variant="contained" color="error">
            削除
          </Button>
        </Stack>
      </Modal>
    </Stack>
  );
};
