import { Modal as MuiModal, Stack } from '@mui/material';

type ModalProps = {
  isActive: boolean;
  handleClose: () => void;
  width?: number;
  children?: React.ReactNode;
};

export const Modal = ({ isActive, width = 400, handleClose, children }: ModalProps) => {
  return (
    <MuiModal open={isActive} onClose={handleClose}>
      <Stack
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: width,
          maxHeight: '90vh',
          overflow: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
        rowGap={4}
      >
        {children}
      </Stack>
    </MuiModal>
  );
};
