import { useEffect, useState } from 'react';

export const useScrollTop = () => {
  const [scrollTop, setScrollTop] = useState<number>(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollTop(window.scrollY);
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [window.scrollY]);

  return scrollTop;
};
