import { css } from '@emotion/react';

type BackGroundImageProps = {
  width: string;
  height: string;
  image: string;
};

export const BackGroundImage = ({ width, height, image }: BackGroundImageProps) => {
  return (
    <div
      css={css`
        width: ${width};
        height: ${height};
        background-image: url(${image});
        background-size: cover;
      `}
    />
  );
};
