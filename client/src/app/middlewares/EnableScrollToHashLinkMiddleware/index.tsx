import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export const EnableScrollToHashLinkMiddleware = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    const removeHashCharacter = (str: string) => {
      const result = str.slice(1);
      return result;
    };

    if (hash !== '') {
      const element = document.getElementById(removeHashCharacter(hash));
      setTimeout(() => {
        element?.scrollIntoView({
          behavior: 'smooth',
          inline: 'start',
        });
      }, 100);
    }
  }, [location]);

  return <Outlet />;
};
