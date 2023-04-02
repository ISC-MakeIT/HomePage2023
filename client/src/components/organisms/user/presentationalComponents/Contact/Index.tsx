import { css } from '@emotion/react';
import React from 'react';
import { Arrow } from 'src/components/atoms/Button/Icon/Arrow';

export const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <div
      css={css`
        background-color: #f15b5b;
        padding: 40px 100px 80px;
      `}
    >
      <div
        css={css`
          text-align: center;
          font-size: 2rem;
          color: #ffffff;
          font-weight: 700;
          margin-bottom: 40px;
        `}
      >
        案件の依頼・お問い合わせはこちらから
      </div>
      <div
        css={css`
          max-width: 1200px;
          margin: 0 auto;
          background-color: white;
          border-radius: 50px;
          padding: 50px 200px;
        `}
      >
        <div
          css={css`
            background-color: #e0e0fa;
            padding: 1rem 2rem;
            margin-bottom: 3rem;
          `}
        >
          ご記入されたメールアドレス宛に返信します。メールアドレスのおまちがいがないか確認の上、送信お願いします。
        </div>
        <form onSubmit={handleSubmit}>
          <div
            css={css`
              margin-bottom: 3rem;
            `}
          >
            <label
              htmlFor='email'
              css={css`
                display: inline-block;
                font-size: 1rem;
                margin-bottom: 1rem;
              `}
            >
              メールアドレス
            </label>
            <input
              id='email'
              name='email'
              type='email'
              required
              css={css`
                font-size: 1.5rem;
                padding: 8px;
                border-radius: 4px;
                background-color: #f8f8f8;
                border: 2px solid #dddddd;
                width: calc(100% - 16px);
              `}
            ></input>
          </div>
          <div
            css={css`
              margin-bottom: 3rem;
            `}
          >
            <label
              htmlFor='name'
              css={css`
                display: inline-block;
                font-size: 1rem;
                margin-bottom: 1rem;
              `}
            >
              お名前(ニックネーム可)
            </label>
            <input
              id='name'
              name='name'
              type='text'
              required
              css={css`
                font-size: 1.5rem;
                padding: 8px;
                border-radius: 4px;
                background-color: #f8f8f8;
                border: 2px solid #dddddd;
                width: calc(100% - 16px);
              `}
            ></input>
          </div>
          <div
            css={css`
              margin-bottom: 8rem;
            `}
          >
            <label
              htmlFor='category'
              css={css`
                display: inline-block;
                font-size: 1rem;
                margin-bottom: 1rem;
              `}
            >
              お問い合わせカテゴリ
            </label>
            <select
              id='category'
              name='category'
              required
              css={css`
                font-size: 1.5rem;
                padding: 8px;
                border-radius: 4px;
                background-color: #f8f8f8;
                border: 2px solid #dddddd;
                width: calc(100%);
              `}
            >
              <option value={''}>未選択</option>
              <option value={'anken'}>案件1</option>
              <option value={'anken'}>案件2</option>
              <option value={'anken'}>案件3</option>
              <option value={'anken'}>案件4</option>
            </select>
          </div>
          <div
            css={css`
              display: flex;
              justify-content: center;
            `}
          >
            <button
              type='submit'
              css={css`
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
              `}
            >
              お問い合わせはこちら
              <span
                css={css`
                  margin-left: 8px;
                `}
              >
                <Arrow />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
