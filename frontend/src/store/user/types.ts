export interface UserState {
  user?: User;
}

export interface User {
  username: string;
  balance: number;
}

export interface FetchUserInput {
  username: string;
  callbacks: { success: () => void };
}
