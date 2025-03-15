export type tokenResponse = {
  token: string;
};

export type UserResponse = {
  userId: string;
  username: string;
  firstname: string;
  lastname: string | null;
  email: string;
  avatar: string | null;
  active: boolean;
  curentUser: boolean;
};
