import { Work as APIWork } from '@api/user/works';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { Arrow } from 'src/components/atoms/Button/Icon/Arrow';
import { USER_ROUTE_PATH_MAP } from 'src/routes/routePath';
import { Work as WorkComponent } from 'src/components/molecules/user/Work';
import { AccessToList } from 'src/components/molecules/user/Button/AccessToList';
import { ToyBackGround } from 'src/components/molecules/user/ToyBackGround';

type WorkProps = APIWork;

export const Work = (work: WorkProps) => {
  return (
    <section
      id='work'
      css={css`
        background-image: url(/work_background.png);
      `}
    >
      <div
        css={css`
          position: relative;
          background-color: rgba(255, 255, 255, 0.95);
          padding: 7.5rem 7rem;
        `}
      >
        <div
          css={css`
            z-index: 2;
            position: relative;
          `}
        >
          <WorkComponent {...work} />
        </div>

        <div
          css={css`
            z-index: 1;
          `}
        >
          <ToyBackGround />
        </div>

        <AccessToList to={USER_ROUTE_PATH_MAP.WORKS} />
      </div>
    </section>
  );
};
