import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, FormHelperText, Stack, Typography } from '@mui/material';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';
import { Modal } from 'src/components/molecules/admin/Modal';

interface DeleteOGPModelProps {
  isActive: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleDeleteOGP: () => void;
  error?: string;
}

export const DeleteOGPModel = ({ isActive, handleOpen, handleClose, handleDeleteOGP, error }: DeleteOGPModelProps) => {
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
            OGPを削除
          </Typography>
          <FormHelperText>OGPの削除を行います。</FormHelperText>
        </Box>
        <Stack flexDirection="row" columnGap={2}>
          <Button onClick={handleClose} variant="outlined">
            キャンセル
          </Button>
          <Button onClick={handleDeleteOGP} variant="contained" color="error">
            削除
          </Button>
        </Stack>
      </Modal>
    </Stack>
  );
};
