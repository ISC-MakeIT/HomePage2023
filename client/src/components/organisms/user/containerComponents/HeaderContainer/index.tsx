import { useScrollTop } from 'src/modules/hooks/usePageScroll';
import { Header } from '../../presentationalComponents/Header';
import { useLocation } from 'react-router-dom';
import { USER_ROUTE_PATH_MAP } from 'src/routes/routePath';

export const HeaderContainer = () => {
  const scrollTop = useScrollTop();
  const location = useLocation();

  return <Header isStartingLocationInThisPage={scrollTop === 0 && location.pathname === USER_ROUTE_PATH_MAP.TOP} />;
};
