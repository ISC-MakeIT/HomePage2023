import { SerializedStyles, css } from '@emotion/react';

type FlexProps = {
  children?: React.ReactNode;
  style?: SerializedStyles;
  spacing: string;
};

export const Flex = ({ spacing, children, style }: FlexProps) => {
  return (
    <div
      css={css`
        display: flex;
        column-gap: ${spacing};
        ${style}
      `}
    >
      {children}
    </div>
  );
};
