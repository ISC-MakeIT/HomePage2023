import { MenuList, Paper, type SxProps, type Theme } from '@mui/material';

interface MenuItemWrapperProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const MenuItemWrapper = ({ children, sx }: MenuItemWrapperProps) => {
  return (
    <Paper sx={{ maxWidth: '100%', ...sx }}>
      <MenuList>{children}</MenuList>
    </Paper>
  );
};
