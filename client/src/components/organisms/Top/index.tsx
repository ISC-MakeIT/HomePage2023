import { css } from '@emotion/react';

export const Top = () => {
  return (
    <div
      css={css`
        width: 100vw;
        height: 0;
        background: url(/index_top_background.jpg) left top no-repeat;
        background-size: contain;
        padding-top: 66.64%; /* (img-height / img-width * container-width) */
                /* (853 / 1280 * 100) */
        overflow: hidden;
      `}
    ></div>
  );
};
