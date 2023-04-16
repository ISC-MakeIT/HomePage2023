import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export const EnableScrollToHashLinkMiddleware = () => {
  let location = useLocation();

  useEffect(() => {
    let hash = location.hash;
    const removeHashCharacter = (str: string) => {
      const result = str.slice(1);
      return result;
    };

    if (hash) {
      let element = document.getElementById(removeHashCharacter(hash));
      element?.scrollIntoView({
        behavior: 'smooth',
        inline: 'nearest',
      });
    }
  }, [location]);

  return <Outlet />;
};
