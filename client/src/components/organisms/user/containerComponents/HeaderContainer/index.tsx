import { useScrollTop } from 'src/modules/hooks/usePageScroll';
import { Header } from '../../presentationalComponents/Header';
import { useLocation } from 'react-router-dom';
import { USER_ROUTE_PATH_MAP } from 'src/routes/routePath';
import { useWindowSize } from 'src/modules/hooks/useWindowSize';
import { HeaderForMobile } from '../../presentationalComponents/HeaderForMobile';
import { useState } from 'react';

export const HeaderContainer = () => {
  const scrollTop = useScrollTop();
  const location = useLocation();
  const { width } = useWindowSize();
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);

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
  return <Header isStartingLocationInThisPage={scrollTop === 0 && location.pathname === USER_ROUTE_PATH_MAP.TOP} />;
};
