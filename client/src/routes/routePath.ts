export const USER_ROUTE_PATH_MAP = {
  OTHER: '*',
  TOP: '/',
} as const;

const ADMIN_ROUTE_TOP = '/admin';

export const ADMIN_ROUTE_PATH_MAP = {
  OTHER: '/*',
  TOP: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  WORKS: '/works',
  NOTIFICATIONS: '/notifications',
  MEMBERS: '/members',
  MYPAGE: '/mypage',
} as const;

export const ADMIN_ROUTE_FULL_PATH_MAP = {
  TOP: ADMIN_ROUTE_TOP,
  LOGIN: `${ADMIN_ROUTE_TOP}${ADMIN_ROUTE_PATH_MAP.LOGIN}`,
  LOGOUT: `${ADMIN_ROUTE_TOP}${ADMIN_ROUTE_PATH_MAP.LOGOUT}`,
  WORKS: `${ADMIN_ROUTE_TOP}${ADMIN_ROUTE_PATH_MAP.WORKS}`,
  NOTIFICATIONS: `${ADMIN_ROUTE_TOP}${ADMIN_ROUTE_PATH_MAP.NOTIFICATIONS}`,
  MEMBERS: `${ADMIN_ROUTE_TOP}${ADMIN_ROUTE_PATH_MAP.MEMBERS}`,
  MYPAGE: `${ADMIN_ROUTE_TOP}${ADMIN_ROUTE_PATH_MAP.MYPAGE}`,
} as const;
