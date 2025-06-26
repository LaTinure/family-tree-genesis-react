
export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth-family',
    REGISTER: '/auth-family',
    FORGOT_PASSWORD: '/auth-family',
    FAMILY: '/auth-family',
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
    CHAT: '/dashboard/chat',
    EVENTS: '/dashboard/events',
    REPORT: '/dashboard/report',
    CONTACT_ADMIN: '/dashboard/contact-admin',
  },
  PROFILE: '/profile',
} as const;
