import { css } from '@emotion/react';
import { Github } from '../../atoms/Button/Icon/Github';
import { GithubText } from '../../atoms/Button/Text/Github';

export const GithubButton = () => {
  return (
    <a href='https://github.com/ISC-MakeIT' css={css`text-decoration: none;`}>
      <button
        type='button'
        css={css`
          box-sizing: border-box;
          width: 99px;
          height: 32px;
          border: 1px solid #ffffff;
          border-radius: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: rgba(0,0,0,0.01);
          padding: 10px;
          :hover{
            cursor: pointer;
          }
        `}
      >
        <span css={css`
          width: 19px;
          height: 19px;
        `}>
          <Github />
        </span>
        <span css={css`
          width: auto;
          height: 15px;
        `}>
          <GithubText />
        </span>
      </button>
    </a>
  );
};
