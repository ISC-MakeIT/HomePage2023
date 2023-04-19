import { type SerializedStyles, css } from '@emotion/react';
import { type ComponentProps } from 'react';
import { Stack } from 'src/components/atoms/Layout/Stack';
import { RedMediumBoldText } from 'src/components/atoms/Text/RedMediumBoldText';

interface TextFieldProps {
  label: string;
  error?: string;
  isErrored?: boolean;
  style?: SerializedStyles;
  inputElementProps: ComponentProps<'input'>;
}

export const TextField = (props: TextFieldProps) => {
  const { style, label, isErrored, error, inputElementProps } = props;

  const Error = () => {
    if (isErrored === true) {
      return <RedMediumBoldText>{error}</RedMediumBoldText>;
    }
    return <></>;
  };

  return (
    <Stack spacing="1rem" style={style}>
      <label
        htmlFor={label}
        css={css`
          display: inline-block;
          font-size: 1rem;
        `}
      >
        {label}
      </label>
      <Stack spacing=".5rem">
        <input
          id={label}
          {...inputElementProps}
          css={css`
            font-size: 1.5rem;
            padding: 8px;
            border-radius: 4px;
            background-color: #f8f8f8;
            border: 2px solid #dddddd;
            width: calc(100% - 16px);
          `}
        />
        <Error />
      </Stack>
    </Stack>
  );
};
