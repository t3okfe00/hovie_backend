export type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  profileUrl: string;
  createdAt: string;
};

export type CreateUserInput = {
  email: string;
  password: string;
  name: string;
  profileUrl: string;
};
