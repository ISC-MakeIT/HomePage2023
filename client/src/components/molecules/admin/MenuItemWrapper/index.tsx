import { MenuList, Paper } from '@mui/material';

type MenuItemWrapperProps = {
  children: React.ReactNode;
  width: number | string;
  height: number | string;
};

export const MenuItemWrapper = ({ children, width, height }: MenuItemWrapperProps) => {
  return (
    <Paper sx={{ maxWidth: '100%', width, height }}>
      <MenuList>{children}</MenuList>
    </Paper>
  );
};
