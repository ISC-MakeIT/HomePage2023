import { css } from '@emotion/react';
import { ToyBackGround } from 'src/components/molecules/user/ToyBackGround';
import { Work } from 'src/components/molecules/user/Work';
import { Work as APIWork } from '@api/user/works';
import { SectionTitle } from 'src/components/molecules/user/SectionTitle';
import { Stack } from 'src/components/atoms/Layout/Stack';

type WorksProps = {
  works: APIWork[];
};

export const Works = ({ works }: WorksProps) => {
  const WorkList = () => (
    <>
      {works.map((work) => (
        <div
          css={css`
            position: relative;
          `}
          key={work.workId}
        >
          <div
            css={css`
              z-index: 2;
              position: relative;
              width: 90%;
              margin: 0 auto;
            `}
          >
            <Work {...work} />
          </div>

          <ToyBackGround />
        </div>
      ))}
    </>
  );

  return (
    <Stack
      spacing='5rem'
      style={css`
        width: 100%;
      `}
    >
      <div
        css={css`
          margin: 0 auto;
          width: 90%;
        `}
      >
        <SectionTitle title='実績情報' description='今までに出場した大会や案件を行った一覧です。' />
      </div>
      <WorkList />
    </Stack>
  );
};
