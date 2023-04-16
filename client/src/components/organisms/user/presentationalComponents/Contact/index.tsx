import { css } from '@emotion/react';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { Woman } from 'src/components/atoms/Button/Icon/Woman';
import { GradientButtonWithIconAndArrow } from 'src/components/molecules/user/Button/GradientButtonWithIconAndArrow';
import { ContactFormInput } from '../../types/ContactFormInput';
import { TextField } from 'src/components/molecules/user/Input/TextField';
import { Flex } from 'src/components/atoms/Layout/Flex';
import { Stack } from 'src/components/atoms/Layout/Stack';
import { WhiteLergeTitle } from 'src/components/atoms/Title/WhiteLergeTitle';
import { Option, Select } from 'src/components/molecules/user/Input/Select';
import { AlertForError } from 'src/components/molecules/admin/AlertForError';
import { AlertForSuccess } from 'src/components/molecules/admin/AlertForSuccess';
import { maxScreen } from 'src/modules/helpers/mediaQueries';

type ContactProps = {
  register: UseFormRegister<ContactFormInput>;
  handleSubmit: UseFormHandleSubmit<ContactFormInput>;
  handleContact: SubmitHandler<ContactFormInput>;

  errors: FieldErrors<ContactFormInput>;
  error?: string;
  success?: string;

  contactCategories: Option[];
};

export const Contact = ({
  register,
  handleSubmit,
  handleContact,
  errors,
  error,
  success,
  contactCategories,
}: ContactProps) => {
  return (
    <section
      id='contact'
      css={css`
        background-color: #f15b5b;
        padding: 2.5rem 6.25rem 5rem 6.25rem;
        box-sizing: border-box;
        width: 100%;

        ${maxScreen('lg')} {
          padding: 2.5rem;
        }

        ${maxScreen('sm')} {
          padding: 6.25rem 1rem;
        }
      `}
    >
      <WhiteLergeTitle
        style={css`
          text-align: center;
        `}
      >
        案件の依頼・お問い合わせはこちらから
      </WhiteLergeTitle>

      <div
        css={css`
          width: 90%;
          box-sizing: border-box;
          margin: 2.5rem auto 0 auto;
          background-color: #fff;
          border-radius: 3.125rem;
          padding: 3.125rem 12.5rem;

          ${maxScreen('lg')} {
            padding: 3.125rem 6rem;
          }

          ${maxScreen('sm')} {
            padding: 3.125rem 3rem;
          }
        `}
      >
        <AlertForError error={error} />
        <AlertForSuccess content={success} />

        <p
          css={css`
            background-color: #e0e0fa;
            padding: 1rem 2rem;
            margin-bottom: 3rem;
          `}
        >
          ご記入されたメールアドレス宛に返信します。メールアドレスのおまちがいがないか確認の上、送信お願いします。
        </p>

        <form
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 12rem;
          `}
          onSubmit={handleSubmit(handleContact)}
        >
          <Stack spacing='3rem'>
            <TextField
              label='メールアドレス'
              isErrored={'email' in errors}
              error={errors.email?.message}
              inputElementProps={{
                ...register('email', {
                  required: 'メールアドレスは必須項目です。',
                  maxLength: { message: 'メールアドレスは319文字以下でなければなりません。', value: 319 },
                }),
                type: 'email',
              }}
            />
            <TextField
              label='お名前(ニックネーム可)'
              isErrored={'name' in errors}
              error={errors.name?.message}
              inputElementProps={{
                ...register('name', {
                  required: 'お名前は必須項目です。',
                  maxLength: { message: 'お名前は255文字以下でなければなりません。', value: 255 },
                }),
                type: 'text',
              }}
            />
            <Select
              label='お問い合わせカテゴリ'
              isErrored={'category' in errors}
              error={errors.category?.message}
              options={contactCategories}
              selectElementProps={{
                ...register('category', {
                  required: 'お問い合わせカテゴリは必須項目です。',
                  maxLength: { message: 'お問い合わせカテゴリは255文字以下でなければなりません。', value: 255 },
                }),
              }}
            />
          </Stack>

          <Flex
            style={css`
              justify-content: center;
            `}
          >
            <GradientButtonWithIconAndArrow
              buttonType='submit'
              icon={<Woman width='1.5rem' height='1.5rem' />}
              gradientType='redToOrange'
            >
              この内容で送信する
            </GradientButtonWithIconAndArrow>
          </Flex>
        </form>
      </div>
    </section>
  );
};
