export const ACTIVITY_STATE_CONSTANT = { ACTIVE: 'active', NON_ACTIVE: 'nonActive' } as const;
export type ACTIVITY_STATE = (typeof ACTIVITY_STATE_CONSTANT)[keyof typeof ACTIVITY_STATE_CONSTANT];

export type EditMeFormInput = {
  name: string;
  jobTitle: string;
  discord?: string;
  twitter?: string;
  github?: string;
  description: string;
  activityState: ACTIVITY_STATE;
};
