import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export const EnableScrollToHashLinkMiddleware = () => {
  const location = useLocation();
  const [isLoadedPage, setIsLoadedPage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadedPage(true);
    }, 1000);
  }, [location]);

  useEffect(() => {
    const hash = location.hash;
    const removeHashCharacter = (str: string) => {
      const result = str.slice(1);
      return result;
    };

    if (hash !== '') {
      const element = document.getElementById(removeHashCharacter(hash));
      if (isLoadedPage) {
        element?.scrollIntoView({
          behavior: 'smooth',
          inline: 'start',
        });
        return;
      }

      setTimeout(() => {
        element?.scrollIntoView({
          behavior: 'smooth',
          inline: 'start',
        });
      }, 750);
    }
  }, [location]);

  return <Outlet />;
};
