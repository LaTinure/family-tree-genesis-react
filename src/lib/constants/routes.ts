
export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
  },
  DASHBOARD: {
    ROOT: '/dashboard',
    TREE: '/dashboard/tree',
    MEMBERS: '/dashboard/members',
    PROFILE: '/dashboard/profile',
    ADMIN: '/dashboard/admin',
    INVITE: '/dashboard/invite',
    MESSAGES: '/dashboard/messages',
    NOTIFICATIONS: '/dashboard/notifications',
  },
  PROFILE: '/profile',
} as const;
