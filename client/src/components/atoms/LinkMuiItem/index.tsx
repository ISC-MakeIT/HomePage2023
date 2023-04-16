import { MenuItem, MenuItemProps } from '@mui/material';
import React from 'react';
import Link from 'next/link';

type LinkMenuItemProps = Omit<MenuItemProps<'a', { href: string }>, 'component' | 'button'>;

const LinkMenuItem = React.forwardRef<HTMLAnchorElement, LinkMenuItemProps>((props, forwardedRef) => {
  const { href, ...other } = props;

  return (
    <Link href={href}>
      <MenuItem component='a' ref={forwardedRef} {...other} />
    </Link>
  );
});
