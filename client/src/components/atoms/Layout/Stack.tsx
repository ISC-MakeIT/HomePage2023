import { SerializedStyles, css } from '@emotion/react';

type StackProps = {
  children?: React.ReactNode;
  spacing: string;
  style: SerializedStyles;
};

export const Stack = ({ spacing, children, style }: StackProps) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: ${spacing};
        ${style}
      `}
    >
      {children}
    </div>
  );
};
