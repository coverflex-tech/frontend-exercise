import { get } from "./client";

export type User = {
  user_id: string;
  data: { balance: number; product_ids: string[] };
};

export type UserResponse = {
  user: User;
};

export const authenticateUser = (username: string): Promise<UserResponse> =>
  get(`users/${username}`);
