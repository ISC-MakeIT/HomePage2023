import { Option } from 'src/components/molecules/user/Input/Select';

export const CONSTANT_CONTACT_CATEGORIE = { EXPERIENCE: '体験入部', PROJECT: '案件の依頼' } as const;

export type CONTACT_CATEGORIE = (typeof CONSTANT_CONTACT_CATEGORIE)[keyof typeof CONSTANT_CONTACT_CATEGORIE];

export const CONTACT_CATEGORIES_FOR_SELECT: Option[] = [
  {
    value: '',
    content: '未選択',
  },
  {
    value: CONSTANT_CONTACT_CATEGORIE.EXPERIENCE,
    content: CONSTANT_CONTACT_CATEGORIE.EXPERIENCE,
  },
  {
    value: CONSTANT_CONTACT_CATEGORIE.PROJECT,
    content: CONSTANT_CONTACT_CATEGORIE.PROJECT,
  },
];
