import { SerializedStyles, css } from '@emotion/react';
import { ComponentProps } from 'react';
import { Stack } from 'src/components/atoms/Layout/Stack';
import { RedBoldText } from 'src/components/atoms/Text/RedBoldText';

export type Option = {
  value: string;
  content: string;
};

type SelectProps = {
  label: string;
  options: Option[];
  error?: string;
  isErrored?: boolean;
  style?: SerializedStyles;
  selectElementProps: ComponentProps<'select'>;
};

export const Select = (props: SelectProps) => {
  const { style, label, options, isErrored, error, selectElementProps } = props;

  const Error = () => {
    if (isErrored) {
      return <RedBoldText>{error}</RedBoldText>;
    }
    return <></>;
  };

  return (
    <Stack spacing='1rem' style={style}>
      <label
        htmlFor={label}
        css={css`
          display: inline-block;
          font-size: 1rem;
        `}
      >
        {label}
      </label>
      <Stack spacing='.5rem'>
        <select
          id={label}
          {...selectElementProps}
          css={css`
            font-size: 1.5rem;
            padding: 0.5rem;
            border-radius: 4px;
            background-color: #f8f8f8;
            border: 2px solid #dddddd;
            width: calc(100%);
          `}
        >
          {options.map((option) => (
            <option value={option.value}>{option.content}</option>
          ))}
        </select>

        <Error />
      </Stack>
    </Stack>
  );
};
