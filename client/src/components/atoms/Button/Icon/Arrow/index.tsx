import { css } from '@emotion/react';

interface Props {
  color?: undefined | string;
}

export const Arrow = ({ color }: Props) => {
  return (
    <div
      css={css`
        width: 22px;
        height: 22px;
      `}
    >
      <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M12.591 7.80974L11.9546 8.44614L14.0515 10.5431L6.67569 10.5431L6.67569 11.4404L14.0515 11.4404L11.9546 13.5373L12.591 14.1737L15.773 10.9917L12.591 7.80974Z'
          fill={color || 'white'}
        />
        <circle cx='11' cy='11' r='10' stroke={color || 'white'} stroke-width='2' />
      </svg>
    </div>
  );
};
