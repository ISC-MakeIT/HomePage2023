import { useEffect, useState } from 'react';
import { Work, apiWorks } from '@api/user/works';
import { Works } from '../../presentationalComponents/Works';

export const WorksContainer = () => {
  const [works, setWorks] = useState<Work[]>();

  useEffect(() => {
    const main = async () => {
      try {
        const response = await apiWorks();
        setWorks(response);
      } catch (e) {
        console.error(e);
      }
    };

    main();
  }, []);

  if (!works) {
    return <></>;
  }

  return <Works works={works} />;
};
