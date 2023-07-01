import { useScrollTop } from 'src/modules/hooks/usePageScroll';
import { Header } from '../../presentationalComponents/Header';
import { USER_ROUTE_PATH_MAP } from 'src/routes/routePath';
import { useWindowSize } from 'src/modules/hooks/useWindowSize';
import { HeaderForMobile } from '../../presentationalComponents/HeaderForMobile';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const HeaderContainer = () => {
  const scrollTop = useScrollTop();
  const { width } = useWindowSize();
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);
  const router = useRouter();

  if (width <= 768) {
    return (
      <HeaderForMobile
        handleOpen={() => {
          setIsOpenedMenu(true);
        }}
        handleClose={() => {
          setIsOpenedMenu(false);
        }}
        isOpenedMenu={isOpenedMenu}
      />
    );
  }
  return <Header isStartingLocationInThisPage={scrollTop === 0 && router.pathname === USER_ROUTE_PATH_MAP.TOP} />;
};
