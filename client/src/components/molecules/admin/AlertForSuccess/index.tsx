import { Alert } from '@mui/material';

type AlertForSuccessProps = {
  content?: string;
};

export const AlertForSuccess = ({ content }: AlertForSuccessProps) =>
  content ? <Alert severity='success'>{content}</Alert> : <></>;
