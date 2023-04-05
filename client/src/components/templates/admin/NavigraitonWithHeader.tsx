import { Stack } from '@mui/material';
import { ReactNode } from 'react';
import { MenuContainer } from '../../organisms/admin/containerComponents/MenuContainer';

type NavigationWithHeaderProps = {
  children?: ReactNode;
  spacing?: number;
};

export const NavigationWithHeader = ({ children, spacing = 2 }: NavigationWithHeaderProps) => {
  return (
    <Stack
      sx={{
        display: 'grid',
        columnGap: '2rem',
        gridTemplateColumns: '320px 1fr',
      }}
    >
      <MenuContainer />
      <Stack
        sx={{
          width: 'calc(100% - 2rem)',
          padding: '1rem 0 0 0',
        }}
        rowGap={spacing}
      >
        {children}
      </Stack>
    </Stack>
  );
};
