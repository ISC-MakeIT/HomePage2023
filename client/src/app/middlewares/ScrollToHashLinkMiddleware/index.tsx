import { useMemo, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export const ScrollToHashLinkMiddleware = () => {
  let location = useLocation();

  let hashElement = useMemo(() => {
    let hash = location.hash;
    const removeHashCharacter = (str: string) => {
      const result = str.slice(1);
      return result;
    };

    if (hash) {
      let element = document.getElementById(removeHashCharacter(hash));
      return element;
    } else {
      return null;
    }
  }, [location]);

  useEffect(() => {
    if (hashElement) {
      hashElement.scrollIntoView({
        behavior: 'smooth',
        inline: 'nearest',
      });
    }
  }, [hashElement]);

  return <Outlet />;
};
