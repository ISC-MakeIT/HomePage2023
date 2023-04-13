import { SerializedStyles, css } from '@emotion/react';

type StackProps = {
  children?: React.ReactNode;
  style?: SerializedStyles;
  spacing: string;
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
