import { type Work, apiWorks } from '@api/user/works';
import { useEffect, useState } from 'react';
import { Work as WorkComponent } from '../../presentationalComponents/Work';

export const WorkContainer = () => {
  const [work, setWork] = useState<Work>();

  useEffect(() => {
    const main = async () => {
      try {
        const response = await apiWorks();

        if (response.length === 0) {
          return;
        }
        setWork(response[0]);
      } catch (e) {
        console.error(e);
      }
    };

    main();
  }, []);

  if (work == null) {
    return <></>;
  }

  return <WorkComponent {...work} />;
};
