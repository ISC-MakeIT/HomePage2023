import { css } from '@emotion/react';
import { Arrow } from 'src/components/atoms/Button/Icon/Arrow';

type ButtonProps = {
  purpose: 'experience' | 'project'; //体験入部: experience & 案件: project
  text: string;
};

export const GradientRadiusButton: React.FC<ButtonProps> = ({ purpose, text }) => {
  return (
    <a
      href={purpose === 'experience' ? '#' : '#'}
      css={css`
        text-decoration: none;
      `}
    >
      <button
        type='button'
        css={
          purpose === 'experience'
            ? css`
                padding: 9px;
                background: linear-gradient(93.95deg, #58e4a8 0%, #5ba0f1 100%);
                display: flex;
                align-items: center;
                color: #ffffff;
                border: none;
                border-radius: 20px;
                font-size: 16px;
                font-weight: 700;
                line-height: 0;
              `
            : css`
                padding: 9px;
                background: linear-gradient(93.95deg, #fa5d36 0%, #ffdf3f 100%);
                display: flex;
                align-items: center;
                color: #ffffff;
                border: none;
                border-radius: 20px;
                font-size: 16px;
                font-weight: 700;
                line-height: 0;
              `
        }
      >
        {text}
        <span
          css={css`
            margin-left: 8px;
          `}
        >
          <Arrow />
        </span>
      </button>
    </a>
  );
};
