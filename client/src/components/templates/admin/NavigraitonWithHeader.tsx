import { Stack } from '@mui/material';
import { ReactNode } from 'react';
import { MenuContainer } from '../../organisms/admin/containerComponents/MenuContainer';

type NavigationWithHeaderProps = {
  children?: ReactNode;
};

export const NavigationWithHeader = ({ children }: NavigationWithHeaderProps) => {
  return (
    <Stack flexDirection='row' columnGap='2rem'>
      <MenuContainer />
      <Stack
        sx={{
          width: '100%',
          padding: '1rem 2rem 0 0',
        }}
        rowGap={2}
      >
        {children}
      </Stack>
    </Stack>
  );
};
