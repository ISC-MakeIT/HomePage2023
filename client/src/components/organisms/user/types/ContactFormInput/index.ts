import { CONTACT_CATEGORIE } from '../../constants/ContactCategories';

export type ContactFormInput = {
  email: string;
  name: string;
  category: CONTACT_CATEGORIE;
};
