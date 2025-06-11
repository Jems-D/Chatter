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
  refreshToken: (id: string) => void;
  logoutUser: () => void;
  isAuthenticated: () => boolean;
}
