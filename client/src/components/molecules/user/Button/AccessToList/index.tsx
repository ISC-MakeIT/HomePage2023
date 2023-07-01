import { css } from '@emotion/react';
import { Arrow } from 'src/components/atoms/Button/Icon/Arrow';
import Link from 'next/link';

interface AccessToListProps {
  to: string;
}

export const AccessToList = ({ to }: AccessToListProps) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: right;
      `}
    >
      <Link
        href={to}
        css={css`
          font-size: 1rem;
          line-height: 1.5rem;
          font-weight: bold;
          color: #ff8567;
          display: flex;
        `}
      >
        一覧で見る
        <Arrow color="#ff8567" />
      </Link>
    </div>
  );
};
