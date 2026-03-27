import { User } from "./user.type";

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = User & {
  accessToken: string;
  refreshToken: string;
};

