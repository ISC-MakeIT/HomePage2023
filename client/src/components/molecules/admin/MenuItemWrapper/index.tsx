import { MenuList, Paper, SxProps, Theme } from '@mui/material';

type MenuItemWrapperProps = {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

export const MenuItemWrapper = ({ children, sx }: MenuItemWrapperProps) => {
  return (
    <Paper sx={{ maxWidth: '100%', ...sx }}>
      <MenuList>{children}</MenuList>
    </Paper>
  );
};
