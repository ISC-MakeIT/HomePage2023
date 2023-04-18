import { type CONTACT_CATEGORIE } from '../../constants/ContactCategories';

export interface ContactFormInput {
  email: string;
  name: string;
  category: CONTACT_CATEGORIE;
}
