export type UserResponse = {
  id: any;
  userId: string;
  username: string;
  firstname: string;
  lastname?: string;
  email: string;
  avatar?: string;
  active: boolean;
  curentUser: boolean;
};

export type createAccount = {
  username: string,
  firstname: string,
  email: string
  password: string,
}

export type createFeed = {
  feedId: string,
  authorId: string,
  content: string,
  createDay: string
}