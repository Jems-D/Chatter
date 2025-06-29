export interface LoginForm {
  emailAddress: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  emailAddress: string;
  password: string;
}

export interface ChatForm {
  chatTitle: string;
  chatContent: string;
}

export interface UserQuery {
  username: string;
  emailAddress: string;
  PageNumber: number;
  PageSize: number;
}
