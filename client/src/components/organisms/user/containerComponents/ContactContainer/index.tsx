import { SubmitHandler, useForm } from 'react-hook-form';
import { Contact } from '../../presentationalComponents/Contact';
import { ContactFormInput } from '../../types/ContactFormInput';
import { CONTACT_CATEGORIES } from '../../constants/ContactCategories';
import { useState } from 'react';
import { apiContact } from '@api/user/contact';
import axios from 'axios';

export const ContactContainer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput>();
  const [error, setError] = useState<string>();

  const handleContact: SubmitHandler<ContactFormInput> = async (contactFormInput) => {
    try {
      await apiContact(contactFormInput);
      setError(undefined);
      reset();
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
      contactCategories={CONTACT_CATEGORIES}
    />
  );
};
