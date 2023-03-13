import { Alert } from '@mui/material';

type AlertForErrorProps = {
  error?: string;
};

export const AlertForError = ({ error }: AlertForErrorProps) =>
  error ? <Alert severity='error'>{error}</Alert> : <></>;
