export interface CreateMemberFormInput {
  name: string;
  jobTitle: string;
  roleId: number;
  discord?: string;
  twitter?: string;
  github?: string;
  description: string;
  icon: File;
  username: string;
  password: string;
}
