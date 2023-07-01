import { type SubmitHandler, useForm } from 'react-hook-form';
import { Contact } from '../../presentationalComponents/Contact';
import { type ContactFormInput } from '../../types/ContactFormInput';
import { useEffect, useState } from 'react';
import { type PostResponse, apiContact } from '@api/user/contact';
import axios from 'axios';
import { type CONTACT_CATEGORIE, CONTACT_CATEGORIES_FOR_SELECT } from '../../constants/ContactCategories';
import { useRouter } from 'next/router';

export const ContactContainer = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormInput>();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const { contactCategory } = router.query;

  useEffect(() => {
    if (router.isReady && contactCategory) {
      setValue('category', contactCategory as CONTACT_CATEGORIE);
    }
  }, [contactCategory, router]);

  const handleContact: SubmitHandler<ContactFormInput> = async (contactFormInput) => {
    try {
      if (isSubmitting) {
        return;
      }
      setIsSubmitting(true);
      await apiContact(contactFormInput);
      setError(undefined);
      reset();
      setSuccess('お問い合わせが完了しました。');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const status = e.response!.status;
        const responseData = e.response!.data as PostResponse;

        if (status === 400 && responseData.message !== '') {
          setError(responseData.message);
          return;
        }

        if (status === 400) {
          setError(Object.values(responseData.errors!).join('\n'));
          return;
        }

        setError(responseData.message);
        return;
      }

      setError('不明なエラーが発生したため、少し時間を置いてからもう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Contact
      register={register}
      handleSubmit={handleSubmit}
      handleContact={handleContact}
      errors={errors}
      error={error}
      success={success}
      isSubmitting={isSubmitting}
      contactCategories={CONTACT_CATEGORIES_FOR_SELECT}
    />
  );
};
