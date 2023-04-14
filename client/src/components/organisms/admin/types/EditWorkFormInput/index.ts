export const ACTIVITY_STATE_CONSTANT = { ACTIVE: 'active', NON_ACTIVE: 'nonActive' } as const;
export type ACTIVITY_STATE = (typeof ACTIVITY_STATE_CONSTANT)[keyof typeof ACTIVITY_STATE_CONSTANT];

export type EditWorkFormInput = {
  title: string;
  contents: string;
  activityState: ACTIVITY_STATE;
  picture?: File;
};
