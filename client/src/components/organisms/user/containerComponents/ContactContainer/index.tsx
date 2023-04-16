import { SubmitHandler, useForm } from 'react-hook-form';
import { Contact } from '../../presentationalComponents/Contact';
import { ContactFormInput } from '../../types/ContactFormInput';
import { useEffect, useState } from 'react';
import { apiContact } from '@api/user/contact';
import axios from 'axios';
import { CONTACT_CATEGORIE, CONTACT_CATEGORIES_FOR_SELECT } from '../../constants/ContactCategories';
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
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    if (query.contactCategory) {
      const contactCategory = query.contactCategory as CONTACT_CATEGORIE;
      setValue('category', contactCategory);
    }
  }, [query]);

  const handleContact: SubmitHandler<ContactFormInput> = async (contactFormInput) => {
    try {
      await apiContact(contactFormInput);
      setError(undefined);
      reset();
      setSuccess('お問い合わせが完了しました。');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const status = e.response!.status;
        const responseData = e.response!.data;

        if (status === 400 && responseData.message) {
          setError(responseData.message!);
          return;
        }

        if (status === 400) {
          setError(Object.values(responseData.errors!).join('\n'));
          return;
        }

        setError(responseData.message!);
        return;
      }

      setError('不明なエラーが発生したため、少し時間を置いてからもう一度お試しください。');
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
      contactCategories={CONTACT_CATEGORIES_FOR_SELECT}
    />
  );
};
