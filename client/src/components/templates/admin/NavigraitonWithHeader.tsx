import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { MenuContainer } from '../../organisms/admin/containerComponents/MenuContainer';

type NavigationWithHeaderProps = {
  children?: ReactNode;
};

export const NavigationWithHeader = ({ children }: NavigationWithHeaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        columnGap: '2rem',
      }}
    >
      <MenuContainer />
      <Box
        sx={{
          width: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
