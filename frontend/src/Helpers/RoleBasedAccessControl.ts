export type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

const ROLES = {
  Admin: [
    "view:chats",
    "create:chats",
    "update:ownChats",
    "delete:chats",
    "view:reactions",
    "add:reactions",
    "delete:reactions",
    "view:comments",
    "create:comments",
    "update:comments",
    "delete:comments",
    "view:users",
  ],
  Moderator: [
    "view:chats",
    "create:chats",
    "delete:chats",
    "view:reactions",
    "add:reactions",
    "delete:reactions",
    "view:comments",
    "create:comments",
    "delete:comments",
  ],
  User: [
    "view:chats",
    "create:chats",
    "update:ownChats",
    "delete:ownChats",
    "view:comments",
    "create:comments",
    "update:ownComments",
    "delete:ownComments",
    "add:reactions",
    "delete:ownReactions",
  ],
  Anonymous: ["view:chats", "view:reactions"],
} as const;

export const hasPermission = (
  user: {
    id: string;
    role: Role;
    username: string;
    emailAddress: string;
  },
  permission: Permission
) => {
  return (ROLES[user.role] as readonly Permission[]).includes(permission);
};
