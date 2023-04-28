import { type SerializedStyles, css } from '@emotion/react';

interface FlexProps {
  children?: React.ReactNode;
  style?: SerializedStyles;
  spacing?: string;
}

export const Flex = ({ spacing, children, style }: FlexProps) => {
  return (
    <div
      css={css`
        display: flex;
        gap: ${spacing};
        ${style}
      `}
    >
      {children}
    </div>
  );
};
