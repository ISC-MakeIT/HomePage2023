import { LoginOutlined } from '@mui/icons-material';
import { Avatar, Button, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { type SubmitHandler, type UseFormHandleSubmit, type UseFormRegister } from 'react-hook-form';
import { AlertForError } from '../../../../molecules/admin/AlertForError';
import { type LoginFormInput } from '../../types/LoginFormInput';

interface LoginFormProps {
  error?: string;
  register: UseFormRegister<LoginFormInput>;
  handleSubmit: UseFormHandleSubmit<LoginFormInput>;
  handleLogin: SubmitHandler<LoginFormInput>;
}

export const LoginForm = ({ error, register, handleSubmit, handleLogin }: LoginFormProps) => {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 2, bgcolor: 'primary.main' }}>
        <LoginOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        ログイン
      </Typography>

      <Box component="form" onSubmit={handleSubmit(handleLogin)} noValidate sx={{ mt: 3, width: '75%' }}>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <AlertForError error={error} />
          </Grid>
          <Grid item sm={12}>
            <TextField required fullWidth id="username" label="ユーザー名" autoFocus {...register('username')} />
          </Grid>
          <Grid item sm={12}>
            <TextField required fullWidth id="password" label="パスワード" type="password" {...register('password')} />
          </Grid>
        </Grid>

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          ログインする
        </Button>
      </Box>
    </Box>
  );
};
