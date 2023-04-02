import { Alert, SxProps, Theme } from '@mui/material';

type AlertForSuccessProps = {
  content?: string;
  sx?: SxProps<Theme>;
};

export const AlertForSuccess = ({ content, sx }: AlertForSuccessProps) =>
  content ? (
    <Alert sx={{ fontWeight: 'bold', ...sx }} severity='success'>
      {content}
    </Alert>
  ) : (
    <></>
  );
