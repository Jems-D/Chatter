export interface UserResponse {
  id: string;
  username: string;
  role: "Admin" | "Moderator" | "User";
  emailAddress: string;
}

export interface UserContextType {
  user: UserResponse | null;
  registerUser: (
    username: string,
    emailAddress: string,
    password: string
  ) => void;
  loginUser: (emailAddress: string, password: string) => void;
  logoutUser: () => void;
  isAuthenticated: () => boolean;
}

export interface User {
  userId: string;
  username: string;
  userRole: string;
  createdAt: string;
  updatedAt: string;
}
